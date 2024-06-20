import { AuthenticationCodeResponse, ExistMemberResponse } from '@/type/services/Login/Login';
import { api } from '../client';
import { OnboardintState } from '@/type/store/OnBoarding/OnBoardState';
import axios from 'axios';
import { Base64ToBlob } from '@/utils/Base64ToBlob';

// 인증코드 요청
export const getAuthenticationCode = async (
  phoneNumber: string,
): Promise<AuthenticationCodeResponse> => {
  const url = `${import.meta.env.VITE_DUETT_API_URL}/api/v1/authentication/code?phoneNumber=${phoneNumber}`;
  const { data } = await api.get<AuthenticationCodeResponse>(url);
  return data;
};

// 사용자 회원가입 여부 확인
export const getExistMember = async (phoneNumber: string): Promise<ExistMemberResponse> => {
  const url = `${import.meta.env.VITE_DUETT_API_URL}/api/v1/authentication/member/exists?phoneNumber=${phoneNumber}`;
  const { data } = await api.get<ExistMemberResponse>(url);
  return data;
};

export const postSignUp = async (userData: OnboardintState['userData']) => {
  const url = `${import.meta.env.VITE_DUETT_API_URL}/api/v1/sign-up`;
  const formData = new FormData();

  // Convert base64 profileImage to Blob and append to FormData
  if (userData.profileImage) {
    const contentType = userData.profileImage.split(';')[0].split(':')[1];
    const blob = Base64ToBlob(userData.profileImage, contentType);
    formData.append('profileImage', blob, 'profileImage.jpg'); // Adjust file name as needed
  }

  // Append other user data
  (Object.keys(userData) as (keyof typeof userData)[]).forEach((key) => {
    if (key !== 'profileImage' && userData[key] !== null && userData[key] !== undefined) {
      formData.append(key, userData[key].toString());
    }
  });

  // Log FormData content for debugging
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}: ${pair[1]}`);
  }

  try {
    const { data } = await api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios error
      console.error(
        'Error during postSignUp:',
        error.response ? error.response.data : error.message,
      );
    } else {
      // Handle unexpected errors
      console.error('Unexpected error during postSignUp:', error);
    }
    throw error;
  }
};
