// Para Otros Interfaces
export interface ResponseApi<T> {
  isSuccess: boolean;
  message?: string;
  response?: T;
}

// Para auth
export interface ResponseMessage {
  isSuccess: boolean;
  message?: string;
  token?: string;
}
