
import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import useToggleSidebar from '../hooks/useToggleSidebar';


const MainLayout = () => {
   const { isSidebarOpen, toggleSidebar } = useToggleSidebar();

  return ( 
    <div className="flex h-screen overflow-x-hidden bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <main className="p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
