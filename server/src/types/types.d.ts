// our custom Type Definitions go here

export interface CustomJWTPayload {
  id: number;
  google_id: string;
  iat?: number;
  exp?: number;
}

export interface UserCookie {
  id: number;
  google_id: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  picture?: string;
}
