import { NavLink } from "react-router-dom";
import {
  HiHome, HiFire, HiHeart, HiClock, HiCollection,
  HiUsers, HiChartBar, HiCog,
} from "react-icons/hi";
import { useAuth } from "../../context/AuthContext.jsx";

const navItems = [
  { to: "/", icon: HiHome, label: "Home", auth: false },
  { to: "/subscriptions", icon: HiUsers, label: "Subscriptions", auth: true },
  { to: "/liked-videos", icon: HiHeart, label: "Liked Videos", auth: true },
  { to: "/history", icon: HiClock, label: "History", auth: true },
  { to: "/dashboard", icon: HiChartBar, label: "Dashboard", auth: true },
  { to: "/settings", icon: HiCog, label: "Settings", auth: true },
];

const Sidebar = ({ isOpen }) => {
  const { user } = useAuth();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-4 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
      isActive
        ? "bg-dark-card text-dark-text"
        : "text-dark-muted hover:bg-dark-card hover:text-dark-text"
    }`;

  if (!isOpen) return null;

  return (
    <aside className="w-56 h-full bg-dark-bg border-r border-dark-border overflow-y-auto flex-shrink-0 py-2 px-2">
      <nav className="flex flex-col gap-1">
        {navItems.map(({ to, icon: Icon, label, auth }) => {
          if (auth && !user) return null;
          return (
            <NavLink key={to} to={to} end={to === "/"} className={linkClass}>
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
