import { useState } from 'react'
import { useOrders } from '../../hooks/useOrders'
import axios from '../../lib/axios'

const OrderDebug = () => {
  const [showDebug, setShowDebug] = useState(false)
  const [testResults, setTestResults] = useState<any[]>([])
  const [isTesting, setIsTesting] = useState(false)

  // Test orders hook
  const { data: ordersData, isLoading, error, refetch } = useOrders({ page: 1, limit: 5 })

  const testOrderEndpoints = async () => {
    setIsTesting(true)
    setTestResults([])

    const endpoints = [
      { name: 'Orders (old)', url: '/orders?page=1&limit=5' },
      { name: 'Orders (admin)', url: '/admin/orders?page=1&limit=5' },
      { name: 'Orders (admin) - no params', url: '/admin/orders' },
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
          ordersCount: response.data?.data?.orders?.length || 0,
          error: null
        }
        
        setTestResults(prev => [...prev, result])
        console.log(`✅ ${endpoint.name}: ${response.status} - ${result.ordersCount} orders`)
      } catch (error: any) {
        const result = {
          name: endpoint.name,
          url: endpoint.url,
          status: error.response?.status || 'Network Error',
          success: false,
          data: null,
          ordersCount: 0,
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
        className="fixed bottom-20 right-4 bg-orange-500 text-white p-2 rounded-full text-xs z-50"
        title="Debug Orders"
      >
        📦
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-md z-50 max-h-96 overflow-y-auto">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-sm">Orders Debug</h3>
        <button
          onClick={() => setShowDebug(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-3 text-xs">
        {/* Hook Status */}
        <div className="border-b pb-2">
          <strong>useOrders Hook:</strong>
          <div className="ml-2 space-y-1">
            <div>Loading: {isLoading ? '✅' : '❌'}</div>
            <div>Has Data: {ordersData ? '✅' : '❌'}</div>
            <div>Orders Count: {ordersData?.data?.orders?.length || 0}</div>
            <div>Error: {error ? '❌' : '✅'}</div>
            {error && (
              <div className="text-red-500 text-xs">
                {JSON.stringify(error, null, 2)}
              </div>
            )}
          </div>
        </div>

        {/* Hook Data */}
        {ordersData && (
          <div className="border-b pb-2">
            <strong>Hook Data:</strong>
            <div className="ml-2 text-xs bg-gray-100 p-2 rounded">
              <pre>{JSON.stringify(ordersData, null, 2)}</pre>
            </div>
          </div>
        )}

        {/* Test Results */}
        <div className="border-b pb-2">
          <strong>API Tests:</strong>
          <button
            onClick={testOrderEndpoints}
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
                  {result.status} - {result.ordersCount} orders
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
              onClick={() => refetch()}
              className="bg-green-500 text-white px-2 py-1 rounded text-xs"
            >
              Refetch Orders
            </button>
            <button
              onClick={() => {
                console.log('Orders Data:', ordersData)
                console.log('Orders Error:', error)
                console.log('Orders Loading:', isLoading)
              }}
              className="bg-purple-500 text-white px-2 py-1 rounded text-xs ml-1"
            >
              Log to Console
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDebug