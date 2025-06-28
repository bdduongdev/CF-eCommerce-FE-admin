import { useEffect, useState } from 'react'
import { useAuthStore } from '../stores/auth.store'
import { useNavigate } from 'react-router-dom'

export const useAuthCheck = () => {
  const { user, accessToken, isAuthenticated, logout } = useAuthStore()
  const navigate = useNavigate()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      console.log('Checking authentication status...')
      
      // Kiểm tra token trong localStorage
      const localStorageToken = localStorage.getItem('accessToken')
      const localStorageUser = localStorage.getItem('user')
      
      console.log('Auth check:', {
        storeAuthenticated: isAuthenticated,
        storeUser: !!user,
        storeToken: !!accessToken,
        localStorageToken: !!localStorageToken,
        localStorageUser: !!localStorageUser
      })

      // Nếu không có token hoặc user, logout
      if (!localStorageToken || !localStorageUser) {
        console.log('No authentication data found, logging out')
        logout()
        navigate('/auth/login')
        return
      }

      // Kiểm tra token validity
      try {
        const payload = JSON.parse(atob(localStorageToken.split('.')[1]))
        const now = Math.floor(Date.now() / 1000)
        
        if (payload.exp < now) {
          console.log('Token expired, logging out')
          logout()
          navigate('/auth/login')
          return
        }
        
        console.log('Token is valid')
      } catch (error) {
        console.error('Invalid token format:', error)
        logout()
        navigate('/auth/login')
        return
      }

      // Kiểm tra role admin
      if (user && user.role !== 'admin') {
        console.log('User is not admin, logging out')
        logout()
        navigate('/auth/login')
        return
      }

      setIsChecking(false)
    }

    checkAuth()
  }, [user, accessToken, isAuthenticated, logout, navigate])

  return { isChecking, isAuthenticated, user }
} 