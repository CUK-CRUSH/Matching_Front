import { AuthenticationCodeResponse } from '@/type/services/Login/Login';
import { api } from '../client';

export const getAuthenticationCode = async (
  phoneNumber: string,
): Promise<AuthenticationCodeResponse> => {
  const url = `${import.meta.env.VITE_DUETT_API_URL}/api/v1/authentication/code?phoneNumber=${phoneNumber}`;
  const { data } = await api.get<AuthenticationCodeResponse>(url);
  return data;
};
