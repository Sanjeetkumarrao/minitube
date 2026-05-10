import React from 'react'
import { Home, PlaySquare, Users, MessageSquare, History, ThumbsUp, ListVideo } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const SidebarItem = ({ icon: Icon, label, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-5 px-3 py-3 rounded-xl transition-all ${
        isActive ? 'bg-[#272727] font-semibold' : 'hover:bg-[#272727]'
      }`
    }
  >
    <Icon className="w-6 h-6" />
    <span className="text-sm hidden lg:block">{label}</span>
  </NavLink>
)

const Sidebar = () => {
  return (
    <aside className="w-20 lg:w-64 bg-[#0F0F0F] flex flex-col gap-2 p-3 border-r border-gray-800 overflow-y-auto">
      <SidebarItem icon={Home} label="Home" to="/" />
      <SidebarItem icon={Users} label="Subscriptions" to="/subscriptions" />
      <SidebarItem icon={MessageSquare} label="Tweets" to="/tweets" />
      
      <hr className="border-gray-800 my-2" />
      
      <SidebarItem icon={History} label="History" to="/history" />
      <SidebarItem icon={PlaySquare} label="My Content" to="/dashboard" />
      <SidebarItem icon={ListVideo} label="Playlists" to="/playlists" />
      <SidebarItem icon={ThumbsUp} label="Liked Videos" to="/liked" />
    </aside>
  )
}

export default Sidebar