import React from 'react'
import { Search, Video, Bell, UserCircle, Menu, LogOut, User as UserIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios.js';

const Navbar = () => {
    const navigate = useNavigate();

    // 1. LocalStorage se user check karo
    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogin = () => {
        navigate(`/login`)
    }

    // 2. Logout Handler
const handleLogout = async () => {
    try {
        const response = await axiosInstance.post("/users/logout");
        if (response.data.success) {
            localStorage.removeItem("user"); 
            
            window.location.reload(); 
        }
    } catch (error) {
        console.error("Logout Error:", error);
        localStorage.removeItem("user");
        window.location.reload();
    }
};

    return (
        <nav className="h-16 bg-[#0F0F0F] flex items-center justify-between px-4 sticky top-0 z-50 border-b border-gray-800">
            {/* Left Section: Logo & Menu */}
            <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-800 rounded-full transition-all">
                    <Menu className="text-white w-6 h-6" />
                </button>
                <div onClick={() => navigate('/')} className="flex items-center gap-1 cursor-pointer">
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

                {/* --- Conditional Rendering: User Profile / Login --- */}
                <div className="group relative ml-2">
                    {user ? (
                        /* Logged In State: Show Avatar */
                        <div className="flex items-center">
                            <div className="w-9 h-9 rounded-full border-2 border-red-600 overflow-hidden cursor-pointer active:scale-95 transition-transform">
                                <img 
                                    src={user.avatar} 
                                    alt="avatar" 
                                    className="w-full h-full object-cover" 
                                />
                            </div>

                            {/* Dropdown Menu on Hover */}
                            <div className="absolute right-0 top-full pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-[70]">
                                <div className="w-56 bg-[#1A1A1A] border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
                                    <div className="p-4 border-b border-gray-700">
                                        <p className="text-white text-sm font-semibold truncate">{user.fullName}</p>
                                        <p className="text-gray-400 text-xs truncate">@{user.username}</p>
                                    </div>
                                    <button 
                                        className="w-full flex items-center gap-3 p-3 text-white hover:bg-[#2A2A2A] transition-colors text-sm"
                                        onClick={() => navigate('/profile')}
                                    >
                                        <UserIcon size={18} /> Profile
                                    </button>
                                    <button 
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 p-3 text-red-500 hover:bg-red-500/10 transition-colors text-sm"
                                    >
                                        <LogOut size={18} /> Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Logged Out State: Show Login Icon */
                        <>
                            <div className="cursor-pointer border-2 border-transparent hover:border-gray-500 rounded-full transition-all">
                                <UserCircle
                                    onClick={handleLogin}
                                    className="text-white w-8 h-8" 
                                />
                            </div>
                            <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-gray-700 text-white text-xs px-3 py-1.5 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[60]">
                                Sign up / Login
                            </span>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar