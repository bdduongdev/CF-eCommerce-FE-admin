// src/hooks/useToggleSidebar.js
import { useState, useCallback } from 'react';

const useToggleSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  return {
    isSidebarOpen,
    toggleSidebar,
  };
};

export default useToggleSidebar;
