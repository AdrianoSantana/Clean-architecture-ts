export interface Authentication {
  auth (email: string, passsword: string): Promise<string>
}
