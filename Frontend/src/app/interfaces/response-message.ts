export interface ResponseMessage {
  isSuccess: boolean;
  message?: string;
  // Para auth
  token?: string;
}
