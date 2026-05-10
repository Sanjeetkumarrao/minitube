import React from 'react'
import { Search, Video, Bell, UserCircle, Menu } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className="h-16 bg-[#0F0F0F] flex items-center justify-between px-4 sticky top-0 z-50 border-b border-gray-800">
      {/* Left Section: Logo & Menu */}
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-800 rounded-full transition-all">
          <Menu className="text-white w-6 h-6" />
        </button>
        <div className="flex items-center gap-1 cursor-pointer">
          <div className="bg-red-600 p-1 rounded-lg">
            <Video className="text-white w-5 h-5" fill="white" />
          </div>
          <span className="text-white font-bold text-xl tracking-tight hidden md:block">
            StreamFlow
          </span>
        </div>
      </div>

      {/* Middle Section: Search Bar */}
      <div className="flex-1 max-w-[600px] hidden sm:flex items-center ml-10">
        <div className="flex w-full bg-[#121212] border border-gray-700 rounded-full overflow-hidden focus-within:border-blue-500 transition-all">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent px-5 py-2 outline-none text-white placeholder-gray-500"
          />
          <button className="bg-[#222222] px-5 border-l border-gray-700 hover:bg-[#333333]">
            <Search className="text-gray-400 w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Right Section: Actions & User */}
      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-gray-800 rounded-full hidden md:block">
          <Video className="text-white w-6 h-6" />
        </button>
        <button className="p-2 hover:bg-gray-800 rounded-full hidden md:block">
          <Bell className="text-white w-6 h-6" />
        </button>
        <div className="ml-2 cursor-pointer border-2 border-transparent hover:border-gray-500 rounded-full transition-all">
           {/* Yahan user ka avatar aayega baad mein */}
          <UserCircle className="text-white w-8 h-8" />
        </div>
      </div>
    </nav>
  )
}

export default Navbar