export interface responsUser {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface User extends responsUser {
  password: string;
}
