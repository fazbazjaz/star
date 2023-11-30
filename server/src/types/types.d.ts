// our custom Type Definitions go here

export interface CustomJWTPayload {
  id: number;
  google_id: string;
  iat?: number;
  exp?: number;
}
