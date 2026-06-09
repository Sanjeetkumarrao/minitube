import { useState, useEffect } from "react";
import { getWatchHistory } from "../services/auth.service.js";
import VideoCard from "../components/video/VideoCard.jsx";
import { PageLoader, EmptyState } from "../components/common/index.jsx";
import { HiClock } from "react-icons/hi";

const WatchHistory = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWatchHistory()
      .then((res) => setVideos(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <HiClock className="w-7 h-7" /> Watch History
      </h1>

      {videos.length === 0 ? (
        <EmptyState
          icon={HiClock}
          title="No watch history"
          subtitle="Videos you watch will appear here"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {videos.map((v) => (
            <VideoCard key={v._id} video={{ ...v, ownerDetails: v.owner }} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchHistory;
