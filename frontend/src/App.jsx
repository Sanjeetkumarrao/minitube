import { Routes, Route } from "react-router-dom"
import MainLayout from "./layout/MainLayout.jsx"
import Home from "./pages/Home.Page.jsx"
import VideoDetail from "./pages/VideoDetail.Page.jsx"
import Tweets from "./pages/Tweets.Page.jsx"
import Login from "./pages/Login.Page.jsx"
import Signup from "./pages/Signup.Page.jsx"
import Profile from "./pages/Profile.Page.jsx"

function App() {
  return (
    <Routes>
      {/* Public/Main Routes with Sidebar & Navbar */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home/>} />
        <Route path="video/:videoId" element={<VideoDetail/>} />
        <Route path="tweets" element={<Tweets/>} />
        <Route path="c/:username" element={<Profile/>} />
      </Route>

      {/* Auth Routes bina Sidebar ke */}
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
    </Routes>
  )
}

export default App