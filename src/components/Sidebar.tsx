
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  FileText, 
  UploadCloud, 
  LogOut, 
  ChevronRight 
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
  { name: "Content", icon: <FileText size={20} />, path: "/dashboard/content" },
  { name: "Users", icon: <Users size={20} />, path: "/dashboard/users" },
  { name: "Uploads", icon: <UploadCloud size={20} />, path: "/dashboard/uploads" },
  { name: "Settings", icon: <Settings size={20} />, path: "/dashboard/settings" },
];

export default function Sidebar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <motion.aside 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-64 bg-white border-r border-gray-200 h-full flex flex-col p-6 shadow-sm"
    >
      {/* Brand Logo */}
      <div className="flex items-center gap-2 mb-10 px-2">
        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-[#B9FF66] rotate-45" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">Brave Wave</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <motion.a
            key={item.name}
            href={item.path}
            whileHover={{ x: 5 }}
            className="flex items-center justify-between p-3 rounded-xl text-gray-600 hover:bg-[#B9FF66] hover:text-black transition-all group"
          >
            <div className="flex items-center gap-3">
              <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </div>
            <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.a>
        ))}
      </nav>

      {/* Logout Button */}
      <button 
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </motion.aside>
  );
}