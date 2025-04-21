import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiFolder,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import logo from "../assets/logo.png";

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, dbUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      name: "Teams",
      path: "/admin/teams",
      icon: <FiUsers className="w-5 h-5" />,
    },
    {
      name: "Projects",
      path: "/admin/projects",
      icon: <FiFolder className="w-5 h-5" />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <FiUsers className="w-5 h-5" />,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: <FiSettings className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <img src={logo} alt="Logo" className="h-8 w-auto mr-2" />
              <span className="text-xl font-bold text-gray-800">
                Admin Panel
              </span>
            </div>
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(false)}
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActive(item.path)
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              <FiLogOut className="w-5 h-5" />
              <span className="ml-3">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(true)}
            >
              <FiMenu className="w-6 h-6" />
            </button>

            <div className="flex items-center">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                  {user?.displayName?.charAt(0) ||
                    user?.email?.charAt(0) ||
                    "U"}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">
                    {user?.displayName || "Admin User"}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
