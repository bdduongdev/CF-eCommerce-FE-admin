import { useState } from 'react'
import axios from '../../lib/axios'

const ApiTest = () => {
  const [results, setResults] = useState<any[]>([])
  const [isTesting, setIsTesting] = useState(false)

  const testEndpoints = [
    { name: 'Users', url: '/users?page=1&limit=5' },
    { name: 'Orders (old)', url: '/orders?page=1&limit=5' },
    { name: 'Orders (admin)', url: '/admin/orders?page=1&limit=5' },
    { name: 'Banners', url: '/banners?page=1&limit=5' },
    { name: 'Categories', url: '/categories' },
    { name: 'Products', url: '/products' },
  ]

  const testEndpoint = async (endpoint: { name: string; url: string }) => {
    try {
      console.log(`Testing ${endpoint.name}: ${endpoint.url}`)
      const response = await axios.get(endpoint.url)
      return {
        name: endpoint.name,
        url: endpoint.url,
        status: response.status,
        success: true,
        data: response.data,
        error: null
      }
    } catch (error: any) {
      return {
        name: endpoint.name,
        url: endpoint.url,
        status: error.response?.status || 'Network Error',
        success: false,
        data: null,
        error: error.response?.data || error.message
      }
    }
  }

  const runAllTests = async () => {
    setIsTesting(true)
    setResults([])
    
    const testResults = []
    for (const endpoint of testEndpoints) {
      const result = await testEndpoint(endpoint)
      testResults.push(result)
      setResults([...testResults])
      // Delay để tránh rate limiting
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    
    setIsTesting(false)
  }

  return (
    <div className="fixed bottom-4 left-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-md z-50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-sm">API Test</h3>
        <button
          onClick={runAllTests}
          disabled={isTesting}
          className="bg-blue-500 text-white px-2 py-1 rounded text-xs disabled:opacity-50"
        >
          {isTesting ? 'Testing...' : 'Test All'}
        </button>
      </div>
      
      <div className="space-y-2 text-xs max-h-64 overflow-y-auto">
        {results.map((result, index) => (
          <div key={index} className="border-b pb-2">
            <div className="font-medium">{result.name}</div>
            <div className="text-gray-600">{result.url}</div>
            <div className={`font-bold ${result.success ? 'text-green-600' : 'text-red-600'}`}>
              {result.status}
            </div>
            {result.error && (
              <div className="text-red-500 text-xs mt-1">
                {JSON.stringify(result.error, null, 2)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ApiTest 