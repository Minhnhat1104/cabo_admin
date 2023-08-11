export interface User {
  _id: string;
  name: string;
  username: string;
  isAdmin: boolean;
  phoneNumber: string;
  email?: string;
}

export interface UserContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
}

export interface LabelValue {
  label: string;
  value: string;
  extra?: any;
}
