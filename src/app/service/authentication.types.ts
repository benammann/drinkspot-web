export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  password_confirm: string;
}

export interface RenewTokenRequest {
  token: string;
}

export interface AuthenticationResponse {
  error?: string;
}

export interface LoginResponse extends AuthenticationResponse {
  token?: string;
}

export interface RegisterResponse extends AuthenticationResponse {
  success?: boolean;
}

export interface RenewTokenResponse extends AuthenticationResponse {
  token?: string;
}
