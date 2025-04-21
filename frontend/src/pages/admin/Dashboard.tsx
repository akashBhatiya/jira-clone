import React from "react";
import { FiUsers, FiFolder, FiActivity } from "react-icons/fi";

const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Users Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
              <FiUsers className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium text-gray-900">Total Users</h2>
              <p className="text-3xl font-bold text-gray-900">24</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-gray-500">
              <span className="text-green-500 font-medium">↑ 12%</span>
              <span className="ml-1">from last month</span>
            </div>
          </div>
        </div>

        {/* Projects Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <FiFolder className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium text-gray-900">
                Active Projects
              </h2>
              <p className="text-3xl font-bold text-gray-900">8</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-gray-500">
              <span className="text-green-500 font-medium">↑ 5%</span>
              <span className="ml-1">from last month</span>
            </div>
          </div>
        </div>

        {/* Teams Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FiUsers className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <h2 className="text-lg font-medium text-gray-900">Teams</h2>
              <p className="text-3xl font-bold text-gray-900">4</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-gray-500">
              <span className="text-green-500 font-medium">↑ 2</span>
              <span className="ml-1">from last month</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <FiActivity className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    New user registered
                  </p>
                  <p className="text-sm text-gray-500">
                    John Doe joined the platform
                  </p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
