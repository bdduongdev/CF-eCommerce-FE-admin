import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Folder,
  MessageCircle,
  Settings,
  Headphones,
  Gift,
  LogOut,
 TicketX,
 PictureInPicture2,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

type SidebarItemProps = {
  to: string;
  icon: JSX.Element;
  label: string;
  badge?: number;
};

type SidebarProps = {
  isOpen: boolean;
};

function SidebarItem({ to, icon, label, badge }: SidebarItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to}>
      <div
        className={`flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer text-sm font-medium transition-all duration-150 ${
          isActive ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span>{label}</span>
        </div>
        {badge !== undefined && (
          <span className="bg-orange-200 text-orange-800 text-xs font-semibold px-2 py-0.5 rounded-full">
            {badge}
          </span>
        )}
      </div>
    </Link>
  );
}

export default function Sidebar({ isOpen }: SidebarProps) {
  return (
    <div
      className={`bg-white border-r h-screen transition-all duration-300 overflow-hidden ${
        isOpen ? 'w-72' : 'w-0'
      }`}
    >
      {/* Nội dung chỉ hiển thị nếu isOpen */}
      <aside className={`${isOpen ? 'block' : 'hidden'} px-6 py-6 flex flex-col justify-between h-full`}>
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-indigo-100 p-2 rounded-full">
              <div className="w-6 h-6 bg-indigo-500 rounded-full" />
            </div>
            <h1 className="text-xl font-semibold text-gray-800">Metrix</h1>
          </div>

          <nav className="space-y-1">
            <SidebarItem to="/" icon={<LayoutDashboard size={18} />} label="Dashboard" />
            <SidebarItem to="/Orders" icon={<ShoppingBag size={18} />} label="Orders" />
            <SidebarItem to="/category" icon={<Users size={18} />} label="Category" />
            <SidebarItem to="/Inventory" icon={<Folder size={18} />} label="Products" />
            <SidebarItem to="/users" icon={<MessageCircle size={18} />} label="Users" />
            <SidebarItem to="/banners" icon={<PictureInPicture2 size={18} />} label="Banners" />
            <SidebarItem to="/ticket" icon={<TicketX size={18} />} label="Ticket" />

            <SidebarItem to="/Settings" icon={<Settings size={18} />} label="Settings" />
          </nav>
        </div>

        <div className="space-y-4">
          <button className="flex items-center gap-2 w-full py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-800">
            <Headphones size={16} />
            Contact Support
          </button>

          <div className="bg-orange-50 px-4 py-3 rounded-lg text-sm">
            <div className="flex items-center gap-2 font-medium text-gray-900">
              <Gift size={16} />
              Free Gift Awaits You!
            </div>
            <div className="text-xs text-gray-600 mt-1">Upgrade your account</div>
          </div>

          <button className="flex bg-white text-gray-900 items-center gap-2 text-red-500 text-sm hover:underline">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>
    </div>
  );
}
