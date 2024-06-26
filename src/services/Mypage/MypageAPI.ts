import { MainInfoDataDTO, ProfilesInfoDTO } from '@/type/services/Mypage/MypageDTO';
import { api } from '../client';
import { Product } from '@/type/product';

export const getUserData = async () => {
  const { data } = await api.get<Product>('/v1/user');
  return data;
};

// Main 페이지 데이터 가져오기
export const getMainData = async (accessToken: string): Promise<MainInfoDataDTO> => {
  const url = `${import.meta.env.VITE_DUETT_API_URL}/api/v1/profiles/home`;
  try {
    const { data } = await api.get<MainInfoDataDTO>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    console.error('에러내용:', error);
    throw new Error('Failed to fetch user info data');
  }
};

//Info 데이터 가져오기
export const getUserInfoData = async (accessToken: string): Promise<ProfilesInfoDTO> => {
  const url = `${import.meta.env.VITE_DUETT_API_URL}/api/v1/profiles/info`;
  try {
    const { data } = await api.get<ProfilesInfoDTO>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    console.error('에러내용:', error);
    throw new Error('Failed to fetch user info data');
  }
};
