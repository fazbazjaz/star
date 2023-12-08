// our custom Type Definitions go here

export interface CustomJWTPayload {
  id: number;
  googleId: string;
  iat?: number;
  exp?: number;
}
