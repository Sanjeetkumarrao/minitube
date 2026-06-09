import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenu, HiSearch, HiVideoCamera } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext.jsx";
import toast from "react-hot-toast";

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Outside click handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out!");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-dark-bg border-b border-dark-border flex items-center justify-between px-4 py-2 gap-4">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="p-2 rounded-full hover:bg-dark-card transition-colors">
          <HiMenu className="w-6 h-6" />
        </button>
        <Link to="/" className="flex items-center gap-1">
          <span className="text-primary font-bold text-2xl">Mini</span>
          <span className="font-bold text-2xl">Tube</span>
        </Link>
      </div>

      {/* Center - Search */}
      <form onSubmit={handleSearch} className="flex flex-1 max-w-xl">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="flex-1 bg-dark-surface border border-dark-border rounded-l-full px-4 py-2 text-dark-text placeholder-dark-muted focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-dark-card border border-l-0 border-dark-border rounded-r-full px-5 hover:bg-dark-border transition-colors"
        >
          <HiSearch className="w-5 h-5" />
        </button>
      </form>

      {/* Right */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <Link
              to="/upload"
              className="flex items-center gap-2 bg-dark-card hover:bg-dark-border px-4 py-2 rounded-full transition-colors text-sm font-medium"
            >
              <HiVideoCamera className="w-5 h-5" />
              <span className="hidden sm:inline">Upload</span>
            </Link>

            {/* Dropdown — ref laga diya */}
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setDropdownOpen((p) => !p)}>
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-9 h-9 rounded-full object-cover border-2 border-dark-border hover:border-primary transition-colors"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-dark-card border border-dark-border rounded-xl shadow-xl z-50 py-2">
                  <div className="px-4 py-2 border-b border-dark-border">
                    <p className="font-medium text-sm">{user.fullName}</p>
                    <p className="text-dark-muted text-xs">@{user.username}</p>
                  </div>
                  <Link
                    to={`/channel/${user.username}`}
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-dark-border transition-colors"
                  >
                    Your Channel
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-dark-border transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm hover:bg-dark-border transition-colors"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-dark-border transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link to="/login" className="btn-primary text-sm">
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
