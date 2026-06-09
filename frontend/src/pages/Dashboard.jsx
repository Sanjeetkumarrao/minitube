import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getChannelStats, getChannelVideos } from "../services/index.js";
import { togglePublish, deleteVideo } from "../services/video.service.js";
import { format } from "timeago.js";
import { HiEye, HiHeart, HiUsers, HiVideoCamera, HiTrash, HiPencil } from "react-icons/hi";
import { PageLoader } from "../components/common/index.jsx";
import toast from "react-hot-toast";

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-dark-card border border-dark-border rounded-xl p-5">
    <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mb-3`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <p className="text-dark-muted text-sm">{label}</p>
    <p className="text-2xl font-bold mt-1">{value?.toLocaleString() || 0}</p>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, videosRes] = await Promise.all([getChannelStats(), getChannelVideos()]);
      setStats(statsRes.data.data);
      setVideos(videosRes.data.data);
    } catch {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (videoId) => {
    try {
      await togglePublish(videoId);
      setVideos((prev) =>
        prev.map((v) => (v._id === videoId ? { ...v, isPublished: !v.isPublished } : v))
      );
    } catch {
      toast.error("Failed to toggle publish status");
    }
  };

  const handleDelete = async (videoId) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteVideo(videoId);
      setVideos((prev) => prev.filter((v) => v._id !== videoId));
      toast.success("Video deleted");
    } catch {
      toast.error("Failed to delete video");
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Channel Dashboard</h1>
        <Link to="/upload" className="btn-primary">Upload Video</Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={HiEye} label="Total Views" value={stats?.totalViews} color="bg-blue-600" />
        <StatCard icon={HiHeart} label="Total Likes" value={stats?.totalLikes} color="bg-red-600" />
        <StatCard icon={HiUsers} label="Subscribers" value={stats?.totalSubscribers} color="bg-purple-600" />
        <StatCard icon={HiVideoCamera} label="Total Videos" value={stats?.totalVideos} color="bg-green-600" />
      </div>

      {/* Videos table */}
      <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-dark-border">
          <h2 className="font-semibold">Your Videos</h2>
        </div>

        {videos.length === 0 ? (
          <div className="p-8 text-center text-dark-muted">
            No videos yet. <Link to="/upload" className="text-blue-400 hover:underline">Upload one!</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-dark-muted border-b border-dark-border">
                  <th className="text-left p-4">Video</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Views</th>
                  <th className="text-left p-4">Likes</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {videos.map((video) => (
                  <tr key={video._id} className="border-b border-dark-border hover:bg-dark-surface transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={video.thumbnail} alt="" className="w-20 aspect-video object-cover rounded-lg" />
                        <p className="font-medium line-clamp-2 max-w-xs">{video.title}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleTogglePublish(video._id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          video.isPublished
                            ? "bg-green-900/40 text-green-400 border border-green-800"
                            : "bg-yellow-900/40 text-yellow-400 border border-yellow-800"
                        }`}
                      >
                        {video.isPublished ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td className="p-4 text-dark-muted">{video.views?.toLocaleString()}</td>
                    <td className="p-4 text-dark-muted">{video.likesCount}</td>
                    <td className="p-4 text-dark-muted">{format(video.createdAt)}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDelete(video._id)}
                          className="p-1.5 text-dark-muted hover:text-red-400 transition-colors"
                        >
                          <HiTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
