// our custom Type Definitions go here

export interface CustomJWTPayload {
  id: number;
  google_id: string;
  firstname: string | undefined;
  lastname: string | undefined;
  email: string | undefined;
  picture: string | undefined;
  iat?: number;
  exp?: number;
}
