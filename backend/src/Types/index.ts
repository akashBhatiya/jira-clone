export interface IUser {
  _id: string;
  uid: string;
  email: string;
  displayName: string;
  role: "admin" | "pm" | "tm" | "user";
  photoURL: string;
  provider: string;
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

export interface IChat {
  userId: string;
  title: string;
  model: string;
  books: string[];
  type: "anonym" | "free" | "premium";
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessage {
  _id: string;
  role: "system" | "user" | "assistant";
  content: string;
  reasoning_content: string;
  books: string[];
  model: string;
  chatId: IChat;
  createdAt: Date;
  updatedAt: Date;
  usage: any;
}
