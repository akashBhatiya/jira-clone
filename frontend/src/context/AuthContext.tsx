import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import * as Types from "../Types";
import { auth } from "../config/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { apiClient } from "../utils/apiclient";

interface AuthContextType {
  user: User | null;
  dbUser: Types.IUser | null;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [dbUser, setDbUser] = useState<Types.IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async (uid: string) => {
      try {
        const resp = await apiClient.get<{ user: Types.IUser }>(
          `/auth/me?uid=${uid}`
        );
        const userDetails = resp.data?.user;
        if (userDetails) {
          setDbUser(userDetails as Types.IUser);

          if (
            !userDetails?.organization &&
            window.location.pathname !== "/organization-setup"
          ) {
            window.location.href = "/organization-setup";
          } else {
            // if (userDetails?.role === "admin") {
            //   window.location.href = "/admin";
            // } else {
            //   window.location.href = "/dashboard";
            // }
          }
        }
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch user details");
        console.error(error);
        setLoading(false);
        window.location.href = "/login";
      }
    };

    const checkAuthStatus = async () => {
      try {
        setLoading(true);
        const unsubscribe = onAuthStateChanged(
          auth,
          (firebaseUser: User | null) => {
            if (firebaseUser) {
              setUser(firebaseUser);
              fetchUserDetails(firebaseUser.uid);
            } else {
              setUser(null);
              setLoading(false);
            }
          }
        );

        // Cleanup subscription on unmount
        return () => unsubscribe();
      } catch (err) {
        setError("Failed to authenticate");
        console.error(err);
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const value = {
    user,
    dbUser,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
