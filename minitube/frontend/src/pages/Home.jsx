import { useState, useEffect } from "react";
import { getAllVideos } from "../services/video.service.js";
import VideoCard from "../components/video/VideoCard.jsx";
import { PageLoader, EmptyState } from "../components/common/index.jsx";
import { HiVideoCamera } from "react-icons/hi";

const categories = ["All", "Gaming", "Music", "News", "Sports", "Education", "Tech", "Comedy"];

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const res = await getAllVideos({ limit: 24, sortBy: "createdAt", sortType: "desc" });
      const data = res.data.data;
      setVideos(Array.isArray(data) ? data : data?.docs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Category chips */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
              activeCategory === cat
                ? "bg-dark-text text-dark-bg"
                : "bg-dark-card text-dark-text hover:bg-dark-border"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <PageLoader />
      ) : videos.length === 0 ? (
        <EmptyState
          icon={HiVideoCamera}
          title="No videos found"
          subtitle="Be the first to upload a video!"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
