import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
interface PrivateRouteProps {
  element: React.ComponentType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Element }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
    setCheckingAuth(false);
  }, [user, loading]);

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#242424]">
        <div className="w-16 h-16 border-4 border-[#2e5442] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <Element />;
};

export default PrivateRoute;
