import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Camera, Edit2, Loader2, Video } from 'lucide-react';
import axiosInstance from '../utils/axios';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { username } = useParams(); 
    const { user: currentUser, fetchCurrentUser } = useAuth();
    const [channel, setChannel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updatingAvatar, setUpdatingAvatar] = useState(false);
    const [updatingCover, setUpdatingCover] = useState(false); // Cover loading state

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

    // 1. Avatar Update Handler
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
            await fetchCurrentUser(); 
            await fetchChannelProfile(); 
        } catch (error) {
            alert("Avatar update failed");
        } finally {
            setUpdatingAvatar(false);
        }
    };

    // 2. Cover Image Update Handler
    const handleCoverChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("coverImage", file); // Backend controller name match hona chahiye

        try {
            setUpdatingCover(true);
            await axiosInstance.patch("/users/cover-image", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            await fetchChannelProfile(); 
        } catch (error) {
            alert("Cover image update failed");
        } finally {
            setUpdatingCover(false);
        }
    };

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-[#0F0F0F]">
            <Loader2 className="animate-spin text-red-600" size={48} />
        </div>
    );

    if (!channel) return <div className="text-white text-center mt-20 text-xl font-bold">Channel not found</div>;

    const isOwner = currentUser?.username === channel?.username;

    return (
        <div className="min-h-screen bg-[#0F0F0F] text-white">
            {/* Cover Image Section */}
            <div className="relative h-40 md:h-60 bg-gray-900 w-full overflow-hidden group border-b border-gray-800">
                {updatingCover ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-20">
                        <Loader2 className="animate-spin text-white mb-2" size={32} />
                        <span className="text-sm font-medium">Uploading Cover...</span>
                    </div>
                ) : (
                    <img 
                        src={channel.coverImage || "https://via.placeholder.com/1500x400?text=No+Cover+Image"} 
                        alt="cover" 
                        className="w-full h-full object-cover opacity-90"
                    />
                )}
                
                {isOwner && !updatingCover && (
                    <label className="absolute bottom-4 right-4 bg-black/60 p-2 rounded-lg hover:bg-black/80 transition-all cursor-pointer border border-gray-600 flex items-center gap-2 group/btn">
                        <Camera size={18} />
                        <span className="text-xs font-medium hidden group-hover/btn:block">Change Cover</span>
                        <input type="file" className="hidden" onChange={handleCoverChange} accept="image/*" />
                    </label>
                )}
            </div>

            {/* Profile Info Section */}
            <div className="max-w-7xl mx-auto px-4 md:px-10">
                <div className="flex flex-col md:flex-row items-center md:items-end gap-6 relative mt-4 mb-8">
                    {/* Avatar with Update Logic */}
                    <div className="relative group z-10">
                        <div className="w-32 h-32 md:w-44 md:h-44 rounded-full border-4 border-[#0F0F0F] overflow-hidden bg-gray-900 shadow-2xl">
                            {updatingAvatar ? (
                                <div className="flex items-center justify-center h-full bg-black/50">
                                    <Loader2 className="animate-spin text-white" />
                                </div>
                            ) : (
                                <img src={channel.avatar} alt="avatar" className="w-full h-full object-cover" />
                            )}
                        </div>
                        {isOwner && !updatingAvatar && (
                            <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity border-2 border-white/20">
                                <Camera size={28} className="text-white" />
                                <input type="file" className="hidden" onChange={handleAvatarChange} accept="image/*" />
                            </label>
                        )}
                    </div>

                    {/* Text Details - Spacing adjusted for overlap fix */}
                    <div className="flex-1 flex flex-col items-center md:items-start space-y-2 pb-4 text-center md:text-left pt-2 md:pt-0">
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-lg">
                            {channel.fullName}
                        </h1>
                        <p className="text-gray-400 font-medium text-base md:text-lg">
                            @{channel.username} • {channel.subscribersCount} subscribers • {channel.channelsSubscribedToCount} subscribed
                        </p>
                        
                        <div className="flex gap-3 pt-3">
                            {isOwner ? (
                                <button className="bg-[#272727] text-white px-6 py-2 rounded-full font-bold hover:bg-[#3f3f3f] transition-all border border-gray-700 active:scale-95">
                                    <Edit2 size={16} className="inline mr-2" /> Edit profile
                                </button>
                            ) : (
                                <button className={`px-8 py-2 rounded-full font-bold transition-all active:scale-95 ${channel.isSubscribed ? 'bg-[#272727] text-white' : 'bg-white text-black hover:bg-gray-200'}`}>
                                    {channel.isSubscribed ? 'Subscribed' : 'Subscribe'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="border-b border-gray-800 flex gap-6 md:gap-10 text-sm font-bold tracking-widest mt-2 overflow-x-auto no-scrollbar">
                    <button className="border-b-2 border-white pb-4 px-2 whitespace-nowrap">VIDEOS</button>
                    <button className="text-gray-400 hover:text-white pb-4 px-2 transition-colors whitespace-nowrap">PLAYLISTS</button>
                    <button className="text-gray-400 hover:text-white pb-4 px-2 transition-colors whitespace-nowrap">TWEETS</button>
                    <button className="text-gray-400 hover:text-white pb-4 px-2 transition-colors whitespace-nowrap">ABOUT</button>
                </div>

                {/* Videos Grid Placeholder */}
                <div className="py-20 text-center flex flex-col items-center gap-4">
                    <div className="bg-gray-900 p-6 rounded-full">
                         <Video size={48} className="text-gray-600" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">No content available</h3>
                        <p className="text-gray-500 mt-1 max-w-sm">This channel hasn't uploaded any videos or playlists yet.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;