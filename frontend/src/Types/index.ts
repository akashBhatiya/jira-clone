export interface RouteType {
  path: string;
  element: React.ComponentType<any>;
  isPrivate?: boolean;
  children?: RouteType[];
}

export interface IUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  provider: string;
  role?: "admin" | "pm" | "tm" | "user";
}
