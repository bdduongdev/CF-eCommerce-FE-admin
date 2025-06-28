import { Navigate, useLocation } from 'react-router-dom'
import { useAuthCheck } from '../../hooks/useAuthCheck'

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const { isChecking, isAuthenticated, user } = useAuthCheck()
  const location = useLocation()

  // Show loading while checking authentication
  if (isChecking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Đang kiểm tra xác thực...</p>
        </div>
      </div>
    )
  }

  // Nếu không authenticated hoặc không có user, redirect to login
  if (!isAuthenticated || !user) {
    console.log('RequireAuth - Redirecting to login: Not authenticated')
    return <Navigate to="/auth/login" replace state={{ from: location }} />
  }

  // Kiểm tra role admin
  if (user.role !== 'admin') {
    console.log('RequireAuth - Redirecting to login: User is not admin')
    return <Navigate to="/auth/login" replace state={{ from: location }} />
  }

  console.log('RequireAuth - Authentication successful, rendering children')
  return children
}