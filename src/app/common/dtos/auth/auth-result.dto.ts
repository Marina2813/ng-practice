import { AuthResponseDto } from "./auth-response.dto";

export interface AuthResultDto {
  success: boolean;
  message: string;
  tokens?: AuthResponseDto;
}