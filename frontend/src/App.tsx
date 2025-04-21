import { Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import PrivateRoute from "./components/PrivateRoute";
import * as Types from "./Types";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();
  useEffect(() => {
    console.log("User Logged in", user);
  }, [user]);
  return (
    <>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen bg-[#242424]">
              <div className="w-16 h-16 border-4 border-[#2e5442] border-t-transparent rounded-full animate-spin"></div>
            </div>
          }
        >
          <Routes>
            {routes.map((route: Types.RouteType) => {
              // Handle routes with children
              if (route.children) {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      route.isPrivate ? (
                        <PrivateRoute element={route.element} route={route} />
                      ) : (
                        <route.element />
                      )
                    }
                  >
                    {route.children.map((child: Types.RouteType) => (
                      <Route
                        key={child.path}
                        path={child.path}
                        element={
                          child.isPrivate ? (
                            <PrivateRoute
                              element={child.element}
                              route={child}
                            />
                          ) : (
                            <child.element />
                          )
                        }
                      />
                    ))}
                  </Route>
                );
              }

              // Handle routes with layouts
              if (route.layout) {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      route.isPrivate ? (
                        <PrivateRoute element={route.element} route={route} />
                      ) : (
                        <route.layout>
                          <route.element />
                        </route.layout>
                      )
                    }
                  />
                );
              }

              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    route.isPrivate ? (
                      <PrivateRoute element={route.element} route={route} />
                    ) : (
                      <route.element />
                    )
                  }
                />
              );
            })}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
