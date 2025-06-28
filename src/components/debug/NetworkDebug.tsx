import { useState } from 'react'
import axios from '../../lib/axios'

const NetworkDebug = () => {
  const [showDebug, setShowDebug] = useState(false)
  const [testResults, setTestResults] = useState<any[]>([])
  const [isTesting, setIsTesting] = useState(false)

  const testConnectivity = async () => {
    setIsTesting(true)
    setTestResults([])

    const tests = [
      {
        name: 'Server Ping',
        url: 'http://localhost:8888/api',
        method: 'GET'
      },
      {
        name: 'Auth Check',
        url: 'http://localhost:8888/api/auth/check',
        method: 'GET'
      },
      {
        name: 'Products API',
        url: 'http://localhost:8888/api/products?page=1&limit=5',
        method: 'GET'
      },
      {
        name: 'Categories API',
        url: 'http://localhost:8888/api/categories',
        method: 'GET'
      },
      {
        name: 'Colors API',
        url: 'http://localhost:8888/api/product-colors',
        method: 'GET'
      },
      {
        name: 'Storages API',
        url: 'http://localhost:8888/api/product-storages',
        method: 'GET'
      }
    ]

    for (const test of tests) {
      try {
        console.log(`Testing ${test.name}: ${test.url}`)
        
        // Test with fetch first
        const fetchResponse = await fetch(test.url, {
          method: test.method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken') || ''}`
          }
        })
        
        const fetchData = await fetchResponse.json()
        
        const result = {
          name: test.name,
          url: test.url,
          method: test.method,
          status: fetchResponse.status,
          success: fetchResponse.ok,
          data: fetchData,
          error: null,
          type: 'fetch'
        }
        
        setTestResults(prev => [...prev, result])
        console.log(`✅ ${test.name}: ${fetchResponse.status}`)
        
      } catch (error: any) {
        const result = {
          name: test.name,
          url: test.url,
          method: test.method,
          status: 'Network Error',
          success: false,
          data: null,
          error: error.message,
          type: 'fetch'
        }
        
        setTestResults(prev => [...prev, result])
        console.error(`❌ ${test.name}: Network Error`, error.message)
      }
      
      // Delay between tests
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    
    setIsTesting(false)
  }

  const testAxios = async () => {
    setIsTesting(true)
    setTestResults([])

    const tests = [
      {
        name: 'Axios - Products',
        url: '/products?page=1&limit=5'
      },
      {
        name: 'Axios - Categories',
        url: '/categories'
      },
      {
        name: 'Axios - Colors',
        url: '/product-colors'
      },
      {
        name: 'Axios - Storages',
        url: '/product-storages'
      }
    ]

    for (const test of tests) {
      try {
        console.log(`Testing ${test.name}: ${test.url}`)
        const response = await axios.get(test.url)
        
        const result = {
          name: test.name,
          url: test.url,
          method: 'GET',
          status: response.status,
          success: true,
          data: response.data,
          error: null,
          type: 'axios'
        }
        
        setTestResults(prev => [...prev, result])
        console.log(`✅ ${test.name}: ${response.status}`)
        
      } catch (error: any) {
        const result = {
          name: test.name,
          url: test.url,
          method: 'GET',
          status: error.response?.status || 'Network Error',
          success: false,
          data: null,
          error: error.response?.data || error.message,
          type: 'axios'
        }
        
        setTestResults(prev => [...prev, result])
        console.error(`❌ ${test.name}: ${result.status}`, error.response?.data)
      }
      
      // Delay between tests
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    
    setIsTesting(false)
  }

  if (!showDebug) {
    return (
      <button
        onClick={() => setShowDebug(true)}
        className="fixed bottom-44 right-4 bg-red-500 text-white p-2 rounded-full text-xs z-50"
        title="Debug Network"
      >
        🌐
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-md z-50 max-h-96 overflow-y-auto">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-sm">Network Debug</h3>
        <button
          onClick={() => setShowDebug(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-3 text-xs">
        {/* Server Status */}
        <div className="border-b pb-2">
          <strong>Server Status:</strong>
          <div className="ml-2 space-y-1">
            <div>Base URL: http://localhost:8888/api</div>
            <div>Token: {localStorage.getItem('accessToken') ? '✅' : '❌'}</div>
            <div>Network: {navigator.onLine ? '✅ Online' : '❌ Offline'}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="border-b pb-2">
          <strong>Actions:</strong>
          <div className="ml-2 space-y-1">
            <button
              onClick={testConnectivity}
              disabled={isTesting}
              className="bg-blue-500 text-white px-2 py-1 rounded text-xs disabled:opacity-50"
            >
              {isTesting ? 'Testing...' : 'Test Fetch'}
            </button>
            <button
              onClick={testAxios}
              disabled={isTesting}
              className="bg-green-500 text-white px-2 py-1 rounded text-xs disabled:opacity-50 ml-1"
            >
              {isTesting ? 'Testing...' : 'Test Axios'}
            </button>
          </div>
        </div>

        {/* Test Results */}
        <div className="border-b pb-2">
          <strong>Test Results:</strong>
          <div className="mt-2 space-y-1">
            {testResults.map((result, index) => (
              <div key={index} className="border-l-2 pl-2">
                <div className="font-medium">{result.name}</div>
                <div className="text-gray-600">{result.url}</div>
                <div className={`font-bold ${result.success ? 'text-green-600' : 'text-red-600'}`}>
                  {result.status} - {result.type}
                </div>
                {result.error && (
                  <div className="text-red-500 text-xs">
                    {typeof result.error === 'string' ? result.error : JSON.stringify(result.error)}
                  </div>
                )}
                {result.data && (
                  <div className="text-green-600 text-xs">
                    Data received: {JSON.stringify(result.data).substring(0, 100)}...
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Fixes */}
        <div>
          <strong>Quick Fixes:</strong>
          <div className="ml-2 space-y-1">
            <button
              onClick={() => {
                localStorage.clear()
                window.location.reload()
              }}
              className="bg-red-500 text-white px-2 py-1 rounded text-xs"
            >
              Clear All & Reload
            </button>
            <button
              onClick={() => {
                console.log('Network Debug Info:', {
                  baseURL: 'http://localhost:8888/api',
                  token: localStorage.getItem('accessToken'),
                  online: navigator.onLine,
                  userAgent: navigator.userAgent
                })
              }}
              className="bg-purple-500 text-white px-2 py-1 rounded text-xs ml-1"
            >
              Log Info
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NetworkDebug 