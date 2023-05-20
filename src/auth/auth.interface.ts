export interface EmptyResponse {
  message: string;
  data: Record<string, never>;
}

export interface BooleanResponse {
  message: string;
  data: boolean;
}

export interface StringResponse {
  message: string;
  data: string;
}

export interface LoginResponse {
  message: string;
  accessToken?: string;
  data: Record<string, any>;
}

export interface AnyResponse {
  message: string;
  data: Record<string, any>;
}
