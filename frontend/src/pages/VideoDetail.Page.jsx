import React from 'react'
import { ThumbsUp, ThumbsDown, Share2, Download, MoreHorizontal } from 'lucide-react'
import VideoCard from '../components/VideoCard' // Reuse for sidebar list

const VideoDetail = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4">
      {/* LEFT SECTION: Player & Info */}
      <div className="flex-1">
        {/* Video Player Placeholder */}
        <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-lg border border-gray-800">
          <video 
            controls 
            className="w-full h-full"
            poster="https://via.placeholder.com/1280x720/121212/FFFFFF?text=StreamFlow+Player"
          >
            {/* Backend se video source yahan aayega */}
          </video>
        </div>

        {/* Video Title */}
        <h1 className="text-xl font-bold mt-4 text-white line-clamp-2">
          Full Stack Video Hosting App using MERN Stack | Production Grade
        </h1>

        {/* Stats & Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-3 border-b border-gray-800 pb-4">
          <div className="flex items-center gap-4">
            {/* Channel Info */}
            <div className="flex items-center gap-3">
              <img src="https://via.placeholder.com/40" className="w-10 h-10 rounded-full border border-gray-700" alt="avatar" />
              <div>
                <h3 className="font-bold text-white text-sm">Sanjeet Kumar Rao</h3>
                <p className="text-gray-400 text-xs">1.2M subscribers</p>
              </div>
            </div>
            <button className="bg-white text-black px-4 py-2 rounded-full font-bold text-sm hover:bg-gray-200 ml-2">
              Subscribe
            </button>
          </div>

          {/* Action Icons */}
          <div className="flex items-center bg-[#272727] rounded-full overflow-hidden">
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-[#3f3f3f] border-r border-gray-600">
              <ThumbsUp size={20} /> <span>12K</span>
            </button>
            <button className="flex items-center px-4 py-2 hover:bg-[#3f3f3f]">
              <ThumbsDown size={20} />
            </button>
          </div>
        </div>

        {/* Description Box */}
        <div className="bg-[#272727] p-3 rounded-xl mt-4 text-sm hover:bg-[#333333] cursor-pointer transition-all">
          <div className="font-bold mb-1">1.5M views • 2 months ago</div>
          <p className="text-gray-300">
            In this video, we deep dive into the backend architecture of a video hosting platform...
            <span className="font-bold text-white block mt-2">Show more</span>
          </p>
        </div>

        {/* Comments Section (Placeholder) */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-4">482 Comments</h3>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex-shrink-0"></div>
            <input 
              type="text" 
              placeholder="Add a comment..." 
              className="w-full bg-transparent border-b border-gray-700 outline-none focus:border-white py-1 transition-all"
            />
          </div>
        </div>
      </div>

      {/* RIGHT SECTION: Recommendations */}
      <div className="lg:w-[400px] flex flex-col gap-4">
        <h2 className="font-bold text-sm text-gray-400 uppercase tracking-wider px-2">Related Videos</h2>
        {/* Map through videos here - using smaller versions of VideoCard */}
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="scale-90 origin-top">
             <VideoCard />
          </div>
        ))}
      </div>
    </div>
  )
}

export default VideoDetail