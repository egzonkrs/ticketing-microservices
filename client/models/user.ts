export interface User {
  id: string;
  email: string;
}

export interface UserFormValues {
  email: string;
  password: string;
}

export interface CurrentUser {
  currentUser: {
    id: string;
    email: string;
    iat: number;
  }
}