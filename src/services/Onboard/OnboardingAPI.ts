import { api } from '../client';

// 카카오톡 유저 확인
export const getKakaoAuthentication = async (kakaoId: string): Promise<boolean> => {
  const url = `${import.meta.env.VITE_DUETT_API_URL}/api/v1/authentication/member/exists/kakao?kakaoId=${kakaoId}`;
  try {
    const { data } = await api.get<{ data: { exists: boolean } }>(url);
    return data.data.exists;
  } catch (error) {
    console.error('에러내용:', error);
    throw new Error('Failed to fetch user info data');
  }
};

// 닉네임 유저 확인
export const getNicknameAuthentication = async (userName: string): Promise<boolean> => {
  const url = `${import.meta.env.VITE_DUETT_API_URL}/api/v1/authentication/member/exists/username?userName=${userName}`;
  try {
    const { data } = await api.get<{ data: { exists: boolean } }>(url);
    return data.data.exists;
  } catch (error) {
    console.error('에러내용:', error);
    throw new Error('Failed to fetch user info data');
  }
};
