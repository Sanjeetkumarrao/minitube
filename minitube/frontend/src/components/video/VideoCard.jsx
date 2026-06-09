import { Link } from "react-router-dom";
import { format } from "timeago.js";

const formatDuration = (seconds) => {
  if (!seconds) return "0:00";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
};

const formatViews = (views) => {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
  return views;
};

const VideoCard = ({ video }) => {
  return (
    <div className="group cursor-pointer">
      <Link to={`/watch/${video._id}`}>
        <div className="relative rounded-xl overflow-hidden aspect-video bg-dark-card">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-medium">
            {formatDuration(video.duration)}
          </span>
        </div>
      </Link>

      <div className="flex gap-3 mt-3">
        <Link to={`/channel/${video.ownerDetails?.username}`} className="flex-shrink-0">
          <img
            src={video.ownerDetails?.avatar}
            alt={video.ownerDetails?.username}
            className="w-9 h-9 rounded-full object-cover"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <Link to={`/watch/${video._id}`}>
            <h3 className="text-dark-text font-medium text-sm leading-5 line-clamp-2 group-hover:text-white">
              {video.title}
            </h3>
          </Link>
          <Link to={`/channel/${video.ownerDetails?.username}`}>
            <p className="text-dark-muted text-xs mt-1 hover:text-dark-text transition-colors">
              {video.ownerDetails?.fullName || video.ownerDetails?.username}
            </p>
          </Link>
          <p className="text-dark-muted text-xs">
            {formatViews(video.views)} views • {format(video.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
