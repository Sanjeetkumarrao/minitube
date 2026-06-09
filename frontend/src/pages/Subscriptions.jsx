import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { getSubscribedChannels, toggleSubscription } from "../services/index.js";
import { PageLoader, EmptyState } from "../components/common/index.jsx";
import { HiUsers } from "react-icons/hi";
import toast from "react-hot-toast";

const Subscriptions = () => {
  const { user } = useAuth();
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getSubscribedChannels(user._id)
        .then((res) => setChannels(res.data.data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleUnsubscribe = async (channelId) => {
    try {
      await toggleSubscription(channelId);
      setChannels((prev) => prev.filter((c) => c._id !== channelId));
      toast.success("Unsubscribed");
    } catch {
      toast.error("Failed");
    }
  };

  if (loading) return <PageLoader />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <HiUsers className="w-7 h-7" /> Subscriptions
      </h1>

      {channels.length === 0 ? (
        <EmptyState
          icon={HiUsers}
          title="No subscriptions yet"
          subtitle="Subscribe to channels to see them here"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {channels.map((ch) => (
            <div key={ch._id} className="bg-dark-card border border-dark-border rounded-xl p-5 flex items-center gap-4">
              <Link to={`/channel/${ch.username}`}>
                <img
                  src={ch.avatar}
                  alt={ch.username}
                  className="w-14 h-14 rounded-full object-cover"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/channel/${ch.username}`}>
                  <p className="font-medium hover:text-white transition-colors truncate">{ch.fullName}</p>
                </Link>
                <p className="text-dark-muted text-sm">@{ch.username}</p>
              </div>
              <button
                onClick={() => handleUnsubscribe(ch._id)}
                className="btn-secondary text-sm flex-shrink-0"
              >
                Unsubscribe
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
