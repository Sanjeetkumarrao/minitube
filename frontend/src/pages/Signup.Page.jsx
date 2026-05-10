import React from 'react'
import { Link } from 'react-router-dom'
import { Camera, UserPlus } from 'lucide-react'

const Signup = () => {
  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center p-6 py-12">
      <div className="w-full max-w-lg bg-[#121212] border border-gray-800 p-8 rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Create Channel</h1>
          <p className="text-gray-400 text-sm">Join the StreamFlow community today</p>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name" className="bg-[#1A1A1A] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500" />
            <input type="text" placeholder="Username" className="bg-[#1A1A1A] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500" />
          </div>
          
          <input type="email" placeholder="Email Address" className="w-full bg-[#1A1A1A] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500" />
          <input type="password" placeholder="Password" className="w-full bg-[#1A1A1A] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500" />

          {/* File Upload Sections */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#272727] border-2 border-dashed border-gray-600 flex items-center justify-center overflow-hidden">
                <Camera className="text-gray-500" size={20} />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-400 block mb-1">Avatar (Required)</label>
                <input type="file" className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-gray-800 file:text-gray-300 hover:file:bg-gray-700 cursor-pointer" />
              </div>
            </div>
          </div>

          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl mt-6 shadow-lg shadow-red-600/20 transition-all">
            Register Account
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Already a creator? 
          <Link to="/login" className="text-red-500 font-semibold ml-1 hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup