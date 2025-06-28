import { useState } from 'react'
import { useProducts } from '../../hooks/useProducts'
import { useCategories } from '../../hooks/useCategories'
import { useColors } from '../../hooks/useColors'
import { useStorages } from '../../hooks/useStorages'
import axios from '../../lib/axios'

const ProductDebug = () => {
  const [showDebug, setShowDebug] = useState(false)
  const [testResults, setTestResults] = useState<any[]>([])
  const [isTesting, setIsTesting] = useState(false)

  // Test hooks
  const { data: productsData, isLoading: productsLoading, error: productsError } = useProducts({ page: 1, limit: 5 })
  const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError } = useCategories()
  const { data: colorsData, isLoading: colorsLoading, error: colorsError } = useColors()
  const { data: storagesData, isLoading: storagesLoading, error: storagesError } = useStorages()

  const testEndpoints = async () => {
    setIsTesting(true)
    setTestResults([])

    const endpoints = [
      { name: 'Products', url: '/products?page=1&limit=5' },
      { name: 'Categories', url: '/categories' },
      { name: 'Colors', url: '/product-colors' },
      { name: 'Storages', url: '/product-storages' },
    ]

    for (const endpoint of endpoints) {
      try {
        console.log(`Testing ${endpoint.name}: ${endpoint.url}`)
        const response = await axios.get(endpoint.url)
        
        const result = {
          name: endpoint.name,
          url: endpoint.url,
          status: response.status,
          success: true,
          data: response.data,
          count: response.data?.data?.products?.length || 
                 response.data?.data?.categories?.length || 
                 response.data?.data?.colors?.length || 
                 response.data?.data?.storages?.length || 0,
          error: null
        }
        
        setTestResults(prev => [...prev, result])
        console.log(`✅ ${endpoint.name}: ${response.status} - ${result.count} items`)
      } catch (error: any) {
        const result = {
          name: endpoint.name,
          url: endpoint.url,
          status: error.response?.status || 'Network Error',
          success: false,
          data: null,
          count: 0,
          error: error.response?.data || error.message
        }
        
        setTestResults(prev => [...prev, result])
        console.error(`❌ ${endpoint.name}: ${result.status}`, error.response?.data)
      }
      
      // Delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    
    setIsTesting(false)
  }

  if (!showDebug) {
    return (
      <button
        onClick={() => setShowDebug(true)}
        className="fixed bottom-32 right-4 bg-green-500 text-white p-2 rounded-full text-xs z-50"
        title="Debug Products"
      >
        📱
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-md z-50 max-h-96 overflow-y-auto">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-sm">Products Debug</h3>
        <button
          onClick={() => setShowDebug(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-3 text-xs">
        {/* Hooks Status */}
        <div className="border-b pb-2">
          <strong>Hooks Status:</strong>
          <div className="ml-2 space-y-1">
            <div>Products: {productsLoading ? '🔄' : productsError ? '❌' : '✅'} ({productsData?.data?.products?.length || 0})</div>
            <div>Categories: {categoriesLoading ? '🔄' : categoriesError ? '❌' : '✅'} ({categoriesData?.data?.categories?.length || 0})</div>
            <div>Colors: {colorsLoading ? '🔄' : colorsError ? '❌' : '✅'} ({colorsData?.data?.colors?.length || 0})</div>
            <div>Storages: {storagesLoading ? '🔄' : storagesError ? '❌' : '✅'} ({storagesData?.data?.storages?.length || 0})</div>
          </div>
        </div>

        {/* Products Data */}
        {productsData && (
          <div className="border-b pb-2">
            <strong>Products Data:</strong>
            <div className="ml-2 text-xs bg-gray-100 p-2 rounded max-h-20 overflow-y-auto">
              {productsData.data.products.map((product: any, index: number) => (
                <div key={index} className="mb-1">
                  {product.product?.product_name} - {product.product?.category?.category_name} - {product.color?.color_name} - {product.storage?.storage_name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categories Data */}
        {categoriesData && (
          <div className="border-b pb-2">
            <strong>Categories:</strong>
            <div className="ml-2 text-xs bg-gray-100 p-2 rounded max-h-20 overflow-y-auto">
              {categoriesData.data.categories.map((category: any, index: number) => (
                <div key={index} className="mb-1">
                  {category.category_name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Colors Data */}
        {colorsData && (
          <div className="border-b pb-2">
            <strong>Colors:</strong>
            <div className="ml-2 text-xs bg-gray-100 p-2 rounded max-h-20 overflow-y-auto">
              {colorsData.data.colors.map((color: any, index: number) => (
                <div key={index} className="mb-1">
                  {color.color_name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Storages Data */}
        {storagesData && (
          <div className="border-b pb-2">
            <strong>Storages:</strong>
            <div className="ml-2 text-xs bg-gray-100 p-2 rounded max-h-20 overflow-y-auto">
              {storagesData.data.storages.map((storage: any, index: number) => (
                <div key={index} className="mb-1">
                  {storage.storage_name}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Test Results */}
        <div className="border-b pb-2">
          <strong>API Tests:</strong>
          <button
            onClick={testEndpoints}
            disabled={isTesting}
            className="ml-2 bg-blue-500 text-white px-2 py-1 rounded text-xs disabled:opacity-50"
          >
            {isTesting ? 'Testing...' : 'Test APIs'}
          </button>
          
          <div className="mt-2 space-y-1">
            {testResults.map((result, index) => (
              <div key={index} className="border-l-2 pl-2">
                <div className="font-medium">{result.name}</div>
                <div className="text-gray-600">{result.url}</div>
                <div className={`font-bold ${result.success ? 'text-green-600' : 'text-red-600'}`}>
                  {result.status} - {result.count} items
                </div>
                {result.error && (
                  <div className="text-red-500 text-xs">
                    {JSON.stringify(result.error, null, 2)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div>
          <strong>Actions:</strong>
          <div className="ml-2 space-y-1">
            <button
              onClick={() => {
                console.log('Products Data:', productsData)
                console.log('Categories Data:', categoriesData)
                console.log('Colors Data:', colorsData)
                console.log('Storages Data:', storagesData)
              }}
              className="bg-purple-500 text-white px-2 py-1 rounded text-xs"
            >
              Log All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDebug