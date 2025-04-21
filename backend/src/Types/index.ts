export interface IUser {
  _id: string;
  uid: string;
  email: string;
  displayName: string;
  role: "admin" | "pm" | "tm" | "user";
  photoURL: string;
  provider: string;
  organization: IOrganization | string;
  status: "active" | "inactive" | "pending";
  invitedby?: IUser | string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IVersion {
  _id: string;
  frontend: string;
  backend: string;
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
