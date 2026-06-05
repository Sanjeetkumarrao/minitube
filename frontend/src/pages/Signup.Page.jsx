import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Camera, Eye, EyeOff, Video, Loader2, CheckCircle2 } from 'lucide-react';
import axiosInstance from '../utils/axios.js';

const Signup = () => {
    const navigate = useNavigate();
    
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        password: ""
    });
    const [avatar, setAvatar] = useState(null);
    const [coverImage, setCoverImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!avatar) {
            alert("Please upload an avatar image");
            return;
        }

        setLoading(true);

        try {
            const data = new FormData();
            data.append("fullName", formData.fullName);
            data.append("username", formData.username);
            data.append("email", formData.email);
            data.append("password", formData.password);
            data.append("avatar", avatar); 
            if (coverImage) data.append("coverImage", coverImage);

            const response = await axiosInstance.post("/users/register", data);
            
            if (response.data.success) {
                // UI changes to Green
                setIsSuccess(true);
                
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            }
        } catch (error) {
            console.error("Signup Error:", error.response?.data?.message || error.message);
            alert(error.response?.data?.message || "Something went wrong during registration");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center p-6 py-12">
            <div className="absolute w-64 h-64 bg-red-600/5 rounded-full blur-[100px] top-10 left-10"></div>
            <div className="absolute w-64 h-64 bg-blue-600/5 rounded-full blur-[100px] bottom-10 right-10"></div>

            <div className="w-full max-w-lg bg-[#121212] border border-gray-800 p-8 rounded-2xl shadow-2xl z-10">
                <div className="flex flex-col items-center mb-6">
                    <div className={`${isSuccess ? 'bg-green-600' : 'bg-red-600'} p-3 rounded-2xl mb-4 transition-colors duration-500`}>
                        <Video className="text-white w-6 h-6" fill="white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Create Channel</h1>
                    <p className="text-gray-400 text-sm mt-1 text-center">Join the StreamFlow community and start sharing</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input 
                            type="text" 
                            placeholder="Full Name" 
                            value={formData.fullName}
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                            className="bg-[#1A1A1A] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 transition-all" 
                            required
                        />
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            className="bg-[#1A1A1A] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 transition-all" 
                            required
                        />
                    </div>
                    
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-[#1A1A1A] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 transition-all" 
                        required
                    />
                    
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password" 
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className="w-full bg-[#1A1A1A] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-red-500 pr-12 transition-all" 
                            required
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <div className="pt-2">
                        <label className="text-xs text-gray-400 block mb-2 px-1 uppercase tracking-wider font-semibold">Avatar Profile (Required)</label>
                        <div className="flex items-center gap-4 bg-[#1A1A1A] p-3 border border-gray-700 rounded-xl">
                            <div className="w-14 h-14 rounded-full bg-[#272727] border-2 border-dashed border-gray-600 flex items-center justify-center overflow-hidden flex-shrink-0">
                                {avatar ? (
                                    <img src={URL.createObjectURL(avatar)} className="w-full h-full object-cover" alt="avatar-preview" />
                                ) : (
                                    <Camera className="text-gray-500" size={20} />
                                )}
                            </div>
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={(e) => setAvatar(e.target.files[0])}
                                className="text-xs text-gray-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:bg-gray-800 file:text-gray-300 hover:file:bg-gray-700 cursor-pointer" 
                            />
                        </div>
                    </div>

                    <div className="pt-1">
                        <label className="text-xs text-gray-400 block mb-2 px-1 uppercase tracking-wider font-semibold">Cover Image (Optional)</label>
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => setCoverImage(e.target.files[0])}
                            className="w-full text-xs text-gray-400 bg-[#1A1A1A] border border-gray-700 rounded-xl p-2 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-gray-800 file:text-gray-300 hover:file:bg-gray-700" 
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || isSuccess}
                        className={`w-full font-bold py-3.5 rounded-xl mt-6 shadow-lg transition-all duration-500 flex items-center justify-center gap-2 ${
                            isSuccess 
                            ? "bg-green-600 shadow-green-600/20 text-white" 
                            : "bg-red-600 hover:bg-red-700 text-white shadow-red-600/20 disabled:opacity-50"
                        }`}
                    >
                        {isSuccess ? (
                            <>
                                <CheckCircle2 className="w-5 h-5 animate-bounce" />
                                Registration Successful! Redirecting...
                            </>
                        ) : loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Processing...
                            </>
                        ) : "Register Account"}
                    </button>
                </form>

                <p className="text-center text-gray-500 text-sm mt-8">
                    Already a creator? 
                    <Link to="/login" className="text-red-500 font-semibold ml-1 hover:underline transition-all">Sign In</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;