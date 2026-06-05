import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Video, Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const loginData = {
            username: formData.username,
            email: formData.username, 
            password: formData.password
        };

        const result = await login(loginData);

        if (result.success) {
            setIsSuccess(true);
            setTimeout(() => {
                navigate("/"); 
            }, 1500);
        } else {
            
            alert(result.message || "Invalid credentials");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center p-4">
           
            <div className="absolute w-64 h-64 bg-red-600/5 rounded-full blur-[100px] top-10 left-10"></div>
            <div className="absolute w-64 h-64 bg-blue-600/5 rounded-full blur-[100px] bottom-10 right-10"></div>

            <div className="w-full max-w-md bg-[#121212]/80 backdrop-blur-xl border border-gray-800 p-8 rounded-2xl shadow-2xl z-10">
                <div className="flex flex-col items-center mb-8">
                    <div className={`${isSuccess ? 'bg-green-600' : 'bg-red-600'} p-3 rounded-2xl mb-4 transition-colors duration-500`}>
                        <Video className="text-white w-8 h-8" fill="white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
                    <p className="text-gray-400 text-sm mt-2 text-center">Enter your details to access your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-sm font-medium text-gray-300 block mb-2 px-1">Username / Email</label>
                        <input 
                            type="text" 
                            value={formData.username}
                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                            className="w-full bg-[#1A1A1A] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-500 outline-none transition-all"
                            placeholder="Enter your username or email"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-300 block mb-2 px-1">Password</label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className="w-full bg-[#1A1A1A] border border-gray-700 rounded-xl px-4 py-3 text-white focus:border-red-500 outline-none transition-all pr-12"
                                placeholder="••••••••"
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
                    </div>

                    <button
                        type="submit"
                        disabled={loading || isSuccess}
                        className={`w-full font-bold py-3.5 rounded-xl mt-4 shadow-lg transition-all duration-500 flex items-center justify-center gap-2 ${
                            isSuccess 
                            ? "bg-green-600 shadow-green-600/20 text-white" 
                            : "bg-red-600 hover:bg-red-700 text-white shadow-red-600/20 disabled:opacity-50"
                        }`}
                    >
                        {isSuccess ? (
                            <>
                                <CheckCircle2 className="w-5 h-5 animate-bounce" />
                                Login Successful! Redirecting...
                            </>
                        ) : loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Signing in...
                            </>
                        ) : "Sign In"}
                    </button>
                </form>

                <p className="text-center text-gray-500 text-sm mt-8">
                    Don't have an account? 
                    <Link to="/signup" className="text-red-500 font-semibold ml-1 hover:underline transition-all">Create Account</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;