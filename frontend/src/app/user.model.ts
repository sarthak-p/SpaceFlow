export interface User {
  id: number;
  profile: {
    firstName: string;
    lastName: string;
    email: string;
  };
  admin: boolean;
  active: boolean;
  status: string;
}
