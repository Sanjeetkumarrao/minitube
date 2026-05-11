import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Camera, Edit2, Loader2 } from 'lucide-react';
import axiosInstance from '../utils/axios';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { username } = useParams(); // URL se username uthayenge
    const { user: currentUser, fetchCurrentUser } = useAuth();
    const [channel, setChannel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updatingAvatar, setUpdatingAvatar] = useState(false);

    // 1. Channel Profile Fetch karna
    const fetchChannelProfile = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/users/c/${username}`);
            setChannel(response.data.data);
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChannelProfile();
    }, [username]);

    // 2. Avatar Update Handler
    const handleAvatarChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("avatar", file);

        try {
            setUpdatingAvatar(true);
            await axiosInstance.patch("/users/avatar", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            await fetchCurrentUser(); // Global context update karo
            await fetchChannelProfile(); // Current page update karo
        } catch (error) {
            alert("Avatar update failed");
        } finally {
            setUpdatingAvatar(false);
        }
    };

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-[#0F0F0F]">
            <Loader2 className="animate-spin text-red-600" size={48} />
        </div>
    );

    if (!channel) return <div className="text-white text-center mt-20">Channel not found</div>;

    const isOwner = currentUser?.username === channel?.username;

    return (
        <div className="min-h-screen bg-[#0F0F0F] text-white">
            {/* Cover Image Section */}
            <div className="relative h-48 md:h-64 bg-gray-800 w-full overflow-hidden group">
                <img 
                    src={channel.coverImage || "https://via.placeholder.com/1500x400"} 
                    alt="cover" 
                    className="w-full h-full object-cover"
                />
                {isOwner && (
                    <button className="absolute bottom-4 right-4 bg-black/60 p-2 rounded-lg hover:bg-black/80 transition-all">
                        <Camera size={20} />
                    </button>
                )}
            </div>

            {/* Profile Info Section */}
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-12 md:-mt-16 mb-8 relative">
                    {/* Avatar with Update Logic */}
                    <div className="relative group">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#0F0F0F] overflow-hidden bg-gray-900 shadow-2xl">
                            {updatingAvatar ? (
                                <div className="flex items-center justify-center h-full">
                                    <Loader2 className="animate-spin text-white" />
                                </div>
                            ) : (
                                <img src={channel.avatar} alt="avatar" className="w-full h-full object-cover" />
                            )}
                        </div>
                        {isOwner && (
                            <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity">
                                <Camera size={28} />
                                <input type="file" className="hidden" onChange={handleAvatarChange} accept="image/*" />
                            </label>
                        )}
                    </div>

                    {/* Text Details */}
                    <div className="flex-1 space-y-2 pb-2 ">
                        <h1 className="text-3xl md:text-4xl font-bold">{channel.fullName}</h1>
                        <p className="text-gray-400 font-medium">@{channel.username} • {channel.subscribersCount} subscribers • {channel.channelsSubscribedToCount} subscribed</p>
                        
                        <div className="flex gap-3 pt-4">
                            {isOwner ? (
                                <button className="bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2">
                                    <Edit2 size={16} /> Edit profile
                                </button>
                            ) : (
                                <button className={`px-6 py-2 rounded-full font-semibold transition-colors ${channel.isSubscribed ? 'bg-gray-800 text-white' : 'bg-red-600 text-white hover:bg-red-700'}`}>
                                    {channel.isSubscribed ? 'Subscribed' : 'Subscribe'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tabs Section (Placeholder for now) */}
                <div className="border-b border-gray-800 flex gap-8 text-sm font-bold tracking-wide">
                    <button className="border-b-2 border-white pb-3">VIDEOS</button>
                    <button className="text-gray-400 hover:text-white pb-3 transition-colors">PLAYLISTS</button>
                    <button className="text-gray-400 hover:text-white pb-3 transition-colors">ABOUT</button>
                </div>

                {/* Videos Grid Placeholder */}
                <div className="py-12 text-center">
                    <p className="text-gray-500">This channel has no videos yet.</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;