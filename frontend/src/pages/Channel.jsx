import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getChannelProfile } from "../services/auth.service.js";
import { getAllVideos } from "../services/video.service.js";
import { toggleSubscription, getUserTweets } from "../services/index.js";
import { useAuth } from "../context/AuthContext.jsx";
import VideoCard from "../components/video/VideoCard.jsx";
import { PageLoader, EmptyState } from "../components/common/index.jsx";
import { HiVideoCamera } from "react-icons/hi";
import { format } from "timeago.js";
import toast from "react-hot-toast";

const tabs = ["Videos", "Tweets", "Playlists", "About"];

const Channel = () => {
  const { username } = useParams();
  const { user } = useAuth();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [activeTab, setActiveTab] = useState("Videos");
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    fetchChannel();
  }, [username]);

  const fetchChannel = async () => {
    setLoading(true);
    try {
      const res = await getChannelProfile(username);
      const ch = res.data.data;
      setChannel(ch);
      setIsSubscribed(ch.isSubscribed);

      const vRes = await getAllVideos({ userId: ch._id, limit: 20 });
      const data = vRes.data.data;
      setVideos(Array.isArray(data) ? data : data?.docs || []);

      const tRes = await getUserTweets(ch._id);
      setTweets(tRes.data.data);
    } catch {
      toast.error("Channel not found");
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async () => {
    if (!user) return toast.error("Please login");
    try {
      const res = await toggleSubscription(channel._id);
      setIsSubscribed(res.data.data.isSubscribed);
      setChannel((prev) => ({
        ...prev,
        subscribersCount: res.data.data.isSubscribed
          ? prev.subscribersCount + 1
          : prev.subscribersCount - 1,
      }));
    } catch {}
  };

  if (loading) return <PageLoader />;
  if (!channel) return <EmptyState title="Channel not found" />;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Cover Image */}
      <div className="h-40 rounded-xl overflow-hidden bg-dark-card mb-4">
        {channel.coverImage ? (
          <img src={channel.coverImage} alt="cover" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-dark-card to-dark-border" />
        )}
      </div>

      {/* Channel info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 px-2">
        <img
          src={channel.avatar}
          alt={channel.username}
          className="w-20 h-20 rounded-full object-cover border-4 border-dark-bg"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{channel.fullName}</h1>
          <p className="text-dark-muted text-sm">
            @{channel.username} • {channel.subscribersCount} subscribers • {videos.length} videos
          </p>
        </div>
        {user?.username !== username && (
          <button
            onClick={handleSubscribe}
            className={`px-5 py-2 rounded-full font-medium transition-colors ${
              isSubscribed
                ? "bg-dark-card text-dark-text hover:bg-dark-border"
                : "bg-dark-text text-dark-bg hover:opacity-90"
            }`}
          >
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-dark-border mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === tab
                ? "border-dark-text text-dark-text"
                : "border-transparent text-dark-muted hover:text-dark-text"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "Videos" && (
        videos.length === 0 ? (
          <EmptyState icon={HiVideoCamera} title="No videos yet" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((v) => <VideoCard key={v._id} video={v} />)}
          </div>
        )
      )}

      {activeTab === "Tweets" && (
        <div className="space-y-4 max-w-2xl">
          {tweets.length === 0 ? (
            <EmptyState title="No tweets yet" />
          ) : tweets.map((tweet) => (
            <div key={tweet._id} className="bg-dark-card rounded-xl p-4 border border-dark-border">
              <div className="flex items-center gap-3 mb-3">
                <img src={tweet.owner?.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <p className="font-medium text-sm">{tweet.owner?.fullName}</p>
                  <p className="text-dark-muted text-xs">{format(tweet.createdAt)}</p>
                </div>
              </div>
              <p className="text-sm">{tweet.content}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "About" && (
        <div className="max-w-2xl space-y-4">
          <div className="bg-dark-card rounded-xl p-6 border border-dark-border">
            <h3 className="font-semibold mb-3">Channel Details</h3>
            <div className="space-y-2 text-sm text-dark-muted">
              <p>📧 {channel.email}</p>
              <p>👥 {channel.subscribersCount} subscribers</p>
              <p>🎬 {videos.length} videos</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Channel;
