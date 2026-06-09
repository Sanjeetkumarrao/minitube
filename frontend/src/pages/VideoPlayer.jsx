import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "timeago.js";
import { HiThumbUp, HiThumbDown, HiShare, HiDotsVertical } from "react-icons/hi";
import { getVideoById, getAllVideos } from "../services/video.service.js";
import { toggleVideoLike } from "../services/index.js";
import { toggleSubscription } from "../services/index.js";
import { useAuth } from "../context/AuthContext.jsx";
import CommentSection from "../components/video/CommentSection.jsx";
import VideoCard from "../components/video/VideoCard.jsx";
import { PageLoader } from "../components/common/index.jsx";
import toast from "react-hot-toast";

const formatViews = (v) => {
  if (!v) return "0";
  if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000) return `${(v / 1000).toFixed(1)}K`;
  return v;
};

const VideoPlayer = () => {
  const { videoId } = useParams();
  const { user } = useAuth();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [descExpanded, setDescExpanded] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    fetchVideo();
    fetchRelated();
    window.scrollTo(0, 0);
  }, [videoId]);

  const fetchVideo = async () => {
    setLoading(true);
    try {
      const res = await getVideoById(videoId);
      const v = res.data.data;
      setVideo(v);
      setIsLiked(v.isLiked);
      setLikesCount(v.likesCount);
      setIsSubscribed(v.owner?.isSubscribed);
    } catch {
      toast.error("Video not found");
    } finally {
      setLoading(false);
    }
  };

  const fetchRelated = async () => {
    try {
      const res = await getAllVideos({ limit: 10, sortBy: "createdAt", sortType: "desc" });
      const data = res.data.data;
      const videos = Array.isArray(data) ? data : data?.docs || [];
      setRelatedVideos(videos.filter((v) => v._id !== videoId));
    } catch {}
  };

  const handleLike = async () => {
    if (!user) return toast.error("Please login to like");
    try {
      const res = await toggleVideoLike(videoId);
      setIsLiked(res.data.data.isLiked);
      setLikesCount((prev) => (res.data.data.isLiked ? prev + 1 : prev - 1));
    } catch {}
  };

  const handleSubscribe = async () => {
    if (!user) return toast.error("Please login to subscribe");
    try {
      const res = await toggleSubscription(video.owner._id);
      setIsSubscribed(res.data.data.isSubscribed);
      toast.success(res.data.data.isSubscribed ? "Subscribed!" : "Unsubscribed");
    } catch {}
  };

  if (loading) return <PageLoader />;
  if (!video) return <div className="text-center py-20 text-dark-muted">Video not found</div>;

  return (
    <div className="flex flex-col xl:flex-row gap-6 max-w-[1600px]">
      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Video player */}
        <div className="rounded-xl overflow-hidden bg-black aspect-video">
          <video
            src={video.videoFile}
            controls
            autoPlay
            className="w-full h-full"
          />
        </div>

        {/* Video info */}
        <div className="mt-4">
          <h1 className="text-xl font-bold text-dark-text leading-tight">{video.title}</h1>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3">
            {/* Channel info */}
            <div className="flex items-center gap-3">
              <Link to={`/channel/${video.owner?.username}`}>
                <img
                  src={video.owner?.avatar}
                  alt={video.owner?.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </Link>
              <div>
                <Link to={`/channel/${video.owner?.username}`}>
                  <p className="font-medium text-sm hover:text-white">{video.owner?.fullName}</p>
                </Link>
                <p className="text-dark-muted text-xs">{formatViews(video.owner?.subscribersCount)} subscribers</p>
              </div>
              <button
                onClick={handleSubscribe}
                className={`ml-2 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  isSubscribed
                    ? "bg-dark-card text-dark-text hover:bg-dark-border"
                    : "bg-dark-text text-dark-bg hover:opacity-90"
                }`}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-dark-card rounded-full overflow-hidden">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 hover:bg-dark-border transition-colors ${
                    isLiked ? "text-blue-400" : "text-dark-text"
                  }`}
                >
                  <HiThumbUp className="w-5 h-5" />
                  <span className="text-sm font-medium">{formatViews(likesCount)}</span>
                </button>
                <div className="w-px h-6 bg-dark-border" />
                <button className="px-4 py-2 hover:bg-dark-border transition-colors text-dark-text">
                  <HiThumbDown className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Link copied!"); }}
                className="flex items-center gap-2 bg-dark-card px-4 py-2 rounded-full hover:bg-dark-border transition-colors text-sm font-medium"
              >
                <HiShare className="w-5 h-5" />
                Share
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="mt-4 bg-dark-card rounded-xl p-4">
            <p className="text-sm text-dark-muted mb-1">
              {formatViews(video.views)} views • {format(video.createdAt)}
            </p>
            <p className={`text-sm text-dark-text whitespace-pre-wrap ${!descExpanded ? "line-clamp-3" : ""}`}>
              {video.description}
            </p>
            <button
              onClick={() => setDescExpanded((p) => !p)}
              className="text-sm font-medium mt-1 hover:text-white"
            >
              {descExpanded ? "Show less" : "...more"}
            </button>
          </div>

          {/* Comments */}
          <CommentSection videoId={videoId} commentCount={0} />
        </div>
      </div>

      {/* Related videos */}
      <div className="xl:w-96 flex-shrink-0">
        <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-dark-muted">Up Next</h3>
        <div className="space-y-3">
          {relatedVideos.map((v) => (
            <div key={v._id} className="flex gap-2">
              <Link to={`/watch/${v._id}`} className="flex-shrink-0 w-40 aspect-video rounded-lg overflow-hidden bg-dark-card">
                <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/watch/${v._id}`}>
                  <p className="text-sm font-medium line-clamp-2 hover:text-white">{v.title}</p>
                </Link>
                <p className="text-dark-muted text-xs mt-1">{v.ownerDetails?.fullName}</p>
                <p className="text-dark-muted text-xs">{formatViews(v.views)} views</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
