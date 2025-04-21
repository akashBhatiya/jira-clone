import { lazy } from "react";

import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
const Home = lazy(() => import("../pages/Home"));

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
];
