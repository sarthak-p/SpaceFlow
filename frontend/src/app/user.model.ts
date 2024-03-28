export interface User {
  id: number;
  profile: {
    firstName: string;
    lastName: string;
    email: string;
  };
  credentials: {
    username: string;
  };
  admin: boolean;
  active: boolean;
  status: string;
}
