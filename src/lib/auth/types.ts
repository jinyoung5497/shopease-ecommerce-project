export interface IUser {
  uid: string;
  email: string;
  displayName: string;
}

export interface RegisterUserReqDTO {
  email: string;
  password: string;
  name: string;
  isSeller: boolean;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  uid: string;
  email: string;
  displayName?: string;
  accessToken: string;
}
