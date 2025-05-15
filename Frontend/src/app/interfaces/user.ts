export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  picture?: string; //url del servidor
  password?: string;
}
