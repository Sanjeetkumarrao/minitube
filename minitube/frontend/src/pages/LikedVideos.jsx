import { useState, useEffect } from "react";
import { getLikedVideos } from "../services/index.js";
import VideoCard from "../components/video/VideoCard.jsx";
import { PageLoader, EmptyState } from "../components/common/index.jsx";
import { HiHeart } from "react-icons/hi";

const LikedVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLikedVideos()
      .then((res) => setVideos(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <HiHeart className="text-primary w-7 h-7" /> Liked Videos
      </h1>

      {videos.length === 0 ? (
        <EmptyState
          icon={HiHeart}
          title="No liked videos"
          subtitle="Videos you like will appear here"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {videos.map((v) => (
            <VideoCard key={v._id} video={v} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedVideos;
