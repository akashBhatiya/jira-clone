export interface RouteType {
  path: string;
  element: React.ComponentType<any>;
  isPrivate?: boolean;
  children?: RouteType[];
  layout?: React.ComponentType<any>;
}

export interface IUser {
  _id: string;
  uid: string;
  email: string;
  organization: IOrganization | string;
  displayName: string;
  photoURL: string;
  provider: string;
  role?: "admin" | "pm" | "tm" | "user";
  status?: "active" | "inactive" | "pending";
  invitedby?: IUser | string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IOrganization {
  _id: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ITeam {
  _id: string;
  name: string;
  description?: string;
  organization?: IOrganization | string;
  members: number;
  projects: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProject {
  _id: string;
  name: string;
  description?: string;
  organization?: IOrganization | string;
  team?: string;
  status?: string;
  dueDate?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
