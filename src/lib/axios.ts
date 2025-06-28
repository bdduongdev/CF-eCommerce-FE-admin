// import axios from 'axios'

// const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })

// // Tự động gắn token nếu có (nếu bạn có login)
// axiosInstance.interceptors.request.use((config) => {
//   const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
//   if (token) config.headers.Authorization = `Bearer ${token}`
//   return config
// })

// export default axiosInstance
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8888/api',
  withCredentials: true,
  timeout: 10000, // 10 seconds timeout
})

// Interceptor để tự động gắn accessToken vào header
instance.interceptors.request.use((config) => {
  // Lấy token từ localStorage
  const accessToken = localStorage.getItem('accessToken')
  
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  
  // Log request để debug
  console.log('Request:', config.method?.toUpperCase(), config.url, {
    hasToken: !!accessToken,
    headers: config.headers
  })
  
  return config
}, (error) => {
  console.error('Request interceptor error:', error)
  return Promise.reject(error)
})

// Interceptor để xử lý response và refresh token nếu cần
instance.interceptors.response.use(
  (response) => {
    console.log('Response:', response.status, response.config.url)
    return response
  },
  async (error) => {
    const originalRequest = error.config
    
    console.error('Response error:', error.response?.status, error.config?.url, error.response?.data)

    // Nếu lỗi 401 và chưa thử refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      console.log('Attempting to refresh token...')

      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (refreshToken) {
          // Gọi API refresh token
          const response = await axios.post('http://localhost:8888/api/auth/refresh-token', {
            refreshToken
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          
          const { accessToken } = response.data.data
          localStorage.setItem('accessToken', accessToken)
          
          console.log('Token refreshed successfully')
          
          // Retry request với token mới
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return instance(originalRequest)
        } else {
          console.log('No refresh token found')
          throw new Error('No refresh token')
        }
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError)
        // Nếu refresh token cũng hết hạn, logout user
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
        
        // Redirect to login page
        if (window.location.pathname !== '/auth/login') {
          window.location.href = '/auth/login'
        }
      }
    }

    // Nếu lỗi 403, có thể là vấn đề về quyền
    if (error.response?.status === 403) {
      console.error('Access forbidden - check user permissions')
    }

    return Promise.reject(error)
  }
)

export default instance
