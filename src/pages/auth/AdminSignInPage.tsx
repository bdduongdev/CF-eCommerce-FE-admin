import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { loginAdmin } from '../../services/auth/authService'
import type { LoginFormData } from '../../services/auth/authService'
import { useAuthStore } from '../../stores/auth.store'

export default function AdminSignInPage() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()

  const mutation = useMutation({
    mutationFn: loginAdmin,
    onSuccess: (data) => {
      // Kiểm tra role admin
      if (data.data.user.role === 'admin') {
        // Lưu vào auth store
        setAuth(data.data.user, data.data.accessToken, data.data.refreshToken)
      navigate('/')
      } else {
        alert('Bạn không có quyền truy cập trang admin')
      }
    },
    onError: (err: any) => {
      const errorMessage = err.response?.data?.message || 'Đăng nhập thất bại'
      alert(errorMessage)
    },
  })

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data)
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{
        backgroundImage: "url('/img/bg-login.jpg')",
      }}
    >
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Admin Login</h2>
        <p className="text-sm text-gray-500 text-center mb-6">Vui lòng đăng nhập để tiếp tục</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email là bắt buộc' })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="admin@example.com"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
            <input
              type="password"
              {...register('password', { required: 'Mật khẩu là bắt buộc' })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className={`w-full py-2 px-4 rounded-lg text-white font-medium transition ${
              mutation.isPending
                ? 'bg-indigo-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {mutation.isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  )
}

