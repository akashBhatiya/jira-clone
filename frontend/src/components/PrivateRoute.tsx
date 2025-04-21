import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import * as Types from "../Types";
import { Outlet } from "react-router-dom";

interface PrivateRouteProps {
  element: React.ComponentType;
  route: Types.RouteType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element: Element,
  route,
}) => {
  const { dbUser, loading } = useAuth();
  const navigate = useNavigate();

  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (!loading && !dbUser) {
      navigate("/login");
    }
    setCheckingAuth(false);
  }, [dbUser, loading]);

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#242424]">
        <div className="w-16 h-16 border-4 border-[#2e5442] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If the route has a layout, render the layout with the Outlet component
  if (route.layout) {
    const Layout = route.layout;
    return <Layout>{route.children ? <Outlet /> : <Element />}</Layout>;
  }

  // Otherwise just render the element
  return <Element />;
};

export default PrivateRoute;
