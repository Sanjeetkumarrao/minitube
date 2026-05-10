import React from 'react'
import { Link } from 'react-router-dom'
import { Video } from 'lucide-react'

const Login = () => {
  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center p-4">
      {/* Background Blur Elements */}
      <div className="absolute w-64 h-64 bg-red-600/10 rounded-full blur-[100px] top-10 left-10"></div>
      <div className="absolute w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] bottom-10 right-10"></div>

      <div className="w-full max-w-md bg-[#121212]/80 backdrop-blur-xl border border-gray-800 p-8 rounded-2xl shadow-2xl z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-red-600 p-3 rounded-2xl mb-4">
            <Video className="text-white w-8 h-8" fill="white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400 text-sm mt-2">Enter your details to access your account</p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-300 block mb-2">Username / Email</label>
            <input 
              type="text" 
              className="w-full bg-[#1A1A1A] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all"
              placeholder="Enter your username or email"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 block mb-2">Password</label>
            <input 
              type="password" 
              className="w-full bg-[#1A1A1A] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl mt-4 transition-all shadow-lg shadow-red-600/20">
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-8">
          Don't have an account? 
          <Link to="/signup" className="text-red-500 font-semibold ml-1 hover:underline">Create Account</Link>
        </p>
      </div>
    </div>
  )
}

export default Login