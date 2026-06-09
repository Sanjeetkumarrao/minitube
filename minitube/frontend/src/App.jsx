import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import VideoPlayer from "./pages/VideoPlayer.jsx";
import Channel from "./pages/Channel.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import LikedVideos from "./pages/LikedVideos.jsx";
import WatchHistory from "./pages/WatchHistory.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import UploadVideo from "./pages/UploadVideo.jsx";
import Settings from "./pages/Settings.jsx";
import Subscriptions from "./pages/Subscriptions.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: "#212121", color: "#f1f1f1", border: "1px solid #3d3d3d" },
          }}
        />
        <Routes>
          {/* Auth routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Main layout routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/watch/:videoId" element={<VideoPlayer />} />
            <Route path="/channel/:username" element={<Channel />} />
            <Route path="/search" element={<SearchResults />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/liked-videos" element={<LikedVideos />} />
              <Route path="/history" element={<WatchHistory />} />
              <Route path="/upload" element={<UploadVideo />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
