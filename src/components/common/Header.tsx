import React from 'react'
import { Menu } from 'lucide-react'

type Props = {
  toggleSidebar: () => void;
};

const Header = ({ toggleSidebar }: Props) => {
  return (
    <header className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        {/* Nút toggle sidebar */}
        <button onClick={toggleSidebar} className="p-2 rounded hover:bg-gray-100 ">
          <Menu size={24} />
        </button>


      </div>
      <div className="flex items-center gap-3">
        <select className="px-2 py-1 border rounded">
          <option>Nanny's Shop</option>
        </select>
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      </div>
    </header>
  )
}

export default Header;
