import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllVideos } from "../services/video.service.js";
import VideoCard from "../components/video/VideoCard.jsx";
import { PageLoader, EmptyState } from "../components/common/index.jsx";
import { HiSearch } from "react-icons/hi";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) fetchResults();
  }, [query]);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const res = await getAllVideos({ query, limit: 20 });
      const data = res.data.data;
      setVideos(Array.isArray(data) ? data : data?.docs || []);
    } catch {
      console.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-6 text-dark-muted">
        Search results for: <span className="text-dark-text">"{query}"</span>
      </h2>

      {loading ? (
        <PageLoader />
      ) : videos.length === 0 ? (
        <EmptyState
          icon={HiSearch}
          title="No results found"
          subtitle={`We couldn't find any videos matching "${query}"`}
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

export default SearchResults;
