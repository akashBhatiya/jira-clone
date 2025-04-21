import React, { useState } from "react";
import { FiSave, FiSettings } from "react-icons/fi";

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    projectUpdates: true,
    teamInvites: true,
    darkMode: false,
    language: "en",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setSettings({
      ...settings,
      [name]: newValue,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <FiSettings className="w-6 h-6 text-indigo-600 mr-2" />
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              General Settings
            </h2>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-4">
                Notifications
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label
                      htmlFor="emailNotifications"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email Notifications
                    </label>
                    <p className="text-sm text-gray-500">
                      Receive email notifications for important updates
                    </p>
                  </div>
                  <div className="flex items-center h-6">
                    <input
                      id="emailNotifications"
                      name="emailNotifications"
                      type="checkbox"
                      checked={settings.emailNotifications}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label
                      htmlFor="projectUpdates"
                      className="text-sm font-medium text-gray-700"
                    >
                      Project Updates
                    </label>
                    <p className="text-sm text-gray-500">
                      Get notified when projects are updated
                    </p>
                  </div>
                  <div className="flex items-center h-6">
                    <input
                      id="projectUpdates"
                      name="projectUpdates"
                      type="checkbox"
                      checked={settings.projectUpdates}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label
                      htmlFor="teamInvites"
                      className="text-sm font-medium text-gray-700"
                    >
                      Team Invites
                    </label>
                    <p className="text-sm text-gray-500">
                      Receive notifications for team invitations
                    </p>
                  </div>
                  <div className="flex items-center h-6">
                    <input
                      id="teamInvites"
                      name="teamInvites"
                      type="checkbox"
                      checked={settings.teamInvites}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-md font-medium text-gray-900 mb-4">
                Appearance
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label
                      htmlFor="darkMode"
                      className="text-sm font-medium text-gray-700"
                    >
                      Dark Mode
                    </label>
                    <p className="text-sm text-gray-500">
                      Switch between light and dark themes
                    </p>
                  </div>
                  <div className="flex items-center h-6">
                    <input
                      id="darkMode"
                      name="darkMode"
                      type="checkbox"
                      checked={settings.darkMode}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-md font-medium text-gray-900 mb-4">
                Language
              </h3>
              <div>
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Language
                </label>
                <select
                  id="language"
                  name="language"
                  value={settings.language}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end">
            {saveSuccess && (
              <div className="mr-4 flex items-center text-green-600">
                <svg
                  className="h-5 w-5 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Settings saved successfully
              </div>
            )}
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <FiSave className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
