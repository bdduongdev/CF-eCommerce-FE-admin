import axios from '../../lib/axios'

export type LoginFormData = {
  email: string
  password: string
}

export type AuthResponse = {
  success: boolean
  data: {
    user: {
      _id: string
      fullname: string
      email: string
      role: string
      isVerified: boolean
    }
    accessToken: string
    refreshToken: string
  }
  message: string
}

export const loginAdmin = async (data: LoginFormData): Promise<AuthResponse> => {
  const res = await axios.post('/auth/login', data)
  return res.data
}

export const logoutAdmin = async (): Promise<{ success: boolean; message: string }> => {
  const res = await axios.post('/auth/logout')
  return res.data
}

export const getAdminProfile = async () => {
  const res = await axios.get('/profile')
  return res.data
}