import { MainInfoDataDTO, ProfilesInfoDTO, UserInfoDTO } from '@/type/services/Mypage/MypageDTO';
import { api } from '../client';
import { Product } from '@/type/product';

export const getUserData = async () => {
  const { data } = await api.get<Product>('/v1/user');
  return data;
};

// Main 페이지 데이터 가져오기(Home)
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

// Info 데이터 수정하기
export const patchUserInfoData = async (accessToken: string, userInfo: UserInfoDTO) => {
  const formData = new FormData();
  const url = `${import.meta.env.VITE_DUETT_API_URL}/api/v1/profiles/info`;

  if (userInfo.profileImage) {
    formData.append('profileImage', userInfo.profileImage);
  }
  if (userInfo.name) {
    formData.append('name', userInfo.name);
  }
  if (userInfo.oneLineIntroduction) {
    formData.append('oneLineIntroduction', userInfo.oneLineIntroduction);
  }
  formData.append('isDeleteImage', String(userInfo.isDeleteImage));

  try {
    const response = await api.patch(url, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error patching user info data:', error);
    throw error;
  }
};
