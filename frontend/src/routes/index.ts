import { lazy } from "react";

import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import AdminDashboard from "../pages/admin/Dashboard";
import Teams from "../pages/admin/Teams";
import Users from "../pages/admin/Users";
import Projects from "../pages/admin/Projects";
import AdminLayout from "../layouts/AdminLayout";
import Settings from "../pages/admin/Settings";
const Home = lazy(() => import("../pages/Home"));
const OrganizationSetup = lazy(() => import("../pages/OrganizationSetup"));

export const routes = [
  {
    path: "/",
    element: Home, // This component will be loaded only when needed
    isPrivate: true,
  },
  {
    path: "/dashboard",
    element: Dashboard,
    isPrivate: true,
  },
  {
    path: "/login",
    element: Login,
    isPrivate: false,
  },
  {
    path: "/signup",
    element: SignUp,
    isPrivate: false,
  },
  {
    path: "/organization-setup",
    element: OrganizationSetup,
    isPrivate: true,
  },
  {
    path: "/admin",
    layout: AdminLayout,
    element: AdminDashboard,
    isPrivate: true,
    children: [
      {
        path: "teams",
        element: Teams,
        isPrivate: true,
      },
      {
        path: "users",
        element: Users,
        isPrivate: true,
      },
      {
        path: "projects",
        element: Projects,
        isPrivate: true,
      },
      {
        path: "settings",
        element: Settings,
        isPrivate: true,
      },
    ],
  },
];
