import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx' 
import Sidebar from '../components/Sidebar.jsx' 

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#0F0F0F] text-white">
      {/* Navbar hamesha top par rahega */}
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar hamesha left mein rahega */}
        <Sidebar />

        {/* Beech ka content jo badlega (Home, Video, Profile etc.) */}
        <main className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout