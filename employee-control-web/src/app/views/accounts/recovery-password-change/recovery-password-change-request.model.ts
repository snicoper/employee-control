export interface RecoveryPasswordChangeRequest {
  userId: string;
  code: string;
  password: string;
  confirmPassword: string;
}
