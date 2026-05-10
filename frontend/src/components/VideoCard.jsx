import React from 'react'
import { MoreVertical } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const VideoCard = ({ video }) => {
    const navigate = useNavigate();

    const handleVideoClick = () =>{
        navigate(`/video/${video?._id || "123"}`)
    }
  return (
    <div 
    onClick={handleVideoClick}
    className="flex flex-col gap-3 cursor-pointer group">
      {/* Thumbnail Container */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-[#272727]">
        <img 
          src={video?.thumbnail || "https://via.placeholder.com/320x180/121212/FFFFFF?text=StreamFlow"} 
          alt={video?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-medium">
          {video?.duration || "10:00"}
        </span>
      </div>

      {/* Video Details */}
      <div className="flex gap-3">
        {/* Channel Avatar */}
        <div className="flex-shrink-0">
          <img 
            src={video?.owner?.avatar || "https://via.placeholder.com/36"} 
            className="w-9 h-9 rounded-full object-cover border border-gray-800"
          />
        </div>

        {/* Text Info */}
        <div className="flex flex-col flex-1">
          <h3 className="text-white font-semibold line-clamp-2 text-sm leading-tight">
            {video?.title || "How to build a Production Grade Video Platform - MERN Stack"}
          </h3>
          <p className="text-gray-400 text-xs mt-1 hover:text-white transition-colors">
            {video?.owner?.username || "CodeWithSanjeet"}
          </p>
          <div className="flex items-center text-gray-400 text-xs gap-1 mt-0.5">
            <span>{video?.views || "0"} views</span>
            <span>•</span>
            <span>2 days ago</span>
          </div>
        </div>

        {/* Menu Icon */}
        <button className="h-fit p-1 hover:bg-gray-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreVertical className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>
  )
}

export default VideoCard