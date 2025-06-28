// import React from 'react'
import { Menu, LogOut, User } from 'lucide-react'
import { useAuthStore } from '../../stores/auth.store'
import { useNavigate } from 'react-router-dom'
import { logoutAdmin } from '../../services/auth/authService'

type Props = {
  toggleSidebar: () => void;
};

const Header = ({ toggleSidebar }: Props) => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutAdmin()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      logout()
      navigate('/auth/login')
    }
  }

  return (
    <header className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        {/* Nút toggle sidebar */}
        <button onClick={toggleSidebar} className="p-2 rounded hover:bg-gray-100">
          <Menu size={24} />
        </button>
      </div>
      
      <div className="flex items-center gap-4">
        <select className="px-2 py-1 border rounded">
          <option>Nanny's Shop</option>
        </select>
        
        {/* User info */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg">
            <User size={16} />
            <span className="text-sm font-medium">{user?.fullname || 'Admin'}</span>
          </div>
          
          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="p-2 rounded hover:bg-red-100 text-red-600 transition-colors"
            title="Đăng xuất"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header;
