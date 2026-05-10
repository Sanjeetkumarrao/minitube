import React from 'react'
import { Heart, MessageCircle, MoreHorizontal, Send } from 'lucide-react'

const Tweets = () => {
  // Dummy data testing ke liye
  const dummyTweets = [
    { id: 1, user: "Sanjeet Rao", username: "@sanjeet", content: "MERN stack project ka flow ekdum sahi ja raha hai! 🚀", likes: 120, time: "2h ago" },
    { id: 2, user: "Code Hunter", username: "@hunter", content: "Bhai nested routing samajh aa gayi, thanks!", likes: 45, time: "5h ago" }
  ]

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Community</h1>

      {/* Post Tweet Input Section */}
      <div className="bg-[#121212] border border-gray-800 rounded-xl p-4 mb-8">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex-shrink-0"></div>
          <div className="flex-1">
            <textarea 
              placeholder="What's on your mind?" 
              className="w-full bg-transparent border-none outline-none text-lg resize-none placeholder-gray-600"
              rows="2"
            ></textarea>
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-800">
              <span className="text-xs text-gray-500 italic">Visible to all subscribers</span>
              <button className="bg-white text-black px-6 py-1.5 rounded-full font-bold text-sm hover:bg-gray-200 flex items-center gap-2">
                Post <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tweets Feed */}
      <div className="flex flex-col gap-4">
        {dummyTweets.map((tweet) => (
          <div key={tweet.id} className="bg-[#0F0F0F] border border-gray-800 rounded-xl p-4 hover:bg-[#161616] transition-all">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0"></div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold mr-2">{tweet.user}</span>
                    <span className="text-gray-500 text-sm">{tweet.username} • {tweet.time}</span>
                  </div>
                  <button className="text-gray-500 hover:text-white"><MoreHorizontal size={18} /></button>
                </div>
                <p className="mt-2 text-white leading-relaxed">{tweet.content}</p>
                
                {/* Interaction Buttons */}
                <div className="flex gap-6 mt-4">
                  <button className="flex items-center gap-1.5 text-gray-500 hover:text-red-500 transition-colors group">
                    <Heart size={18} className="group-hover:fill-red-500" />
                    <span className="text-sm">{tweet.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-500 transition-colors">
                    <MessageCircle size={18} />
                    <span className="text-sm">Comments</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tweets