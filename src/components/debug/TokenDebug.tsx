import { useAuthStore } from '../../stores/auth.store'
import { useState } from 'react'

const TokenDebug = () => {
  const { user, accessToken, refreshToken, isAuthenticated } = useAuthStore()
  const [showDebug, setShowDebug] = useState(false)

  const localStorageToken = localStorage.getItem('accessToken')
  const localStorageRefreshToken = localStorage.getItem('refreshToken')
  const localStorageUser = localStorage.getItem('user')

  const checkTokenValidity = () => {
    if (!localStorageToken) {
      return 'No token found'
    }

    try {
      const payload = JSON.parse(atob(localStorageToken.split('.')[1]))
      const now = Math.floor(Date.now() / 1000)
      
      if (payload.exp < now) {
        return `Token expired at ${new Date(payload.exp * 1000).toLocaleString()}`
      }
      
      return `Token valid until ${new Date(payload.exp * 1000).toLocaleString()}`
    } catch (error) {
      return 'Invalid token format'
    }
  }

  if (!showDebug) {
    return (
      <button
        onClick={() => setShowDebug(true)}
        className="fixed bottom-4 right-4 bg-red-500 text-white p-2 rounded-full text-xs z-50"
        title="Debug Authentication"
      >
        🔧
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-md z-50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-sm">Auth Debug</h3>
        <button
          onClick={() => setShowDebug(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-2 text-xs">
        <div>
          <strong>Store State:</strong>
          <div className="ml-2">
            <div>isAuthenticated: {isAuthenticated ? '✅' : '❌'}</div>
            <div>hasUser: {user ? '✅' : '❌'}</div>
            <div>hasAccessToken: {accessToken ? '✅' : '❌'}</div>
            <div>hasRefreshToken: {refreshToken ? '✅' : '❌'}</div>
          </div>
        </div>
        
        <div>
          <strong>LocalStorage:</strong>
          <div className="ml-2">
            <div>accessToken: {localStorageToken ? '✅' : '❌'}</div>
            <div>refreshToken: {localStorageRefreshToken ? '✅' : '❌'}</div>
            <div>user: {localStorageUser ? '✅' : '❌'}</div>
          </div>
        </div>
        
        <div>
          <strong>Token Status:</strong>
          <div className="ml-2 text-red-600">{checkTokenValidity()}</div>
        </div>
        
        <div>
          <strong>User Role:</strong>
          <div className="ml-2">{user?.role || 'None'}</div>
        </div>
        
        <div>
          <strong>Actions:</strong>
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
                console.log('Auth Store:', useAuthStore.getState())
                console.log('LocalStorage:', {
                  accessToken: localStorage.getItem('accessToken'),
                  refreshToken: localStorage.getItem('refreshToken'),
                  user: localStorage.getItem('user')
                })
              }}
              className="bg-blue-500 text-white px-2 py-1 rounded text-xs ml-1"
            >
              Log to Console
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TokenDebug 