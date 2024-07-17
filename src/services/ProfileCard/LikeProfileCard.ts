import { api } from '../client';

// 코인을 사용해서 프로필카드 상세 단일 조회하기
export const likeProfile = async (
  accessToken: string,
  profileId?: number,
): Promise<any> => {
  const url = `${import.meta.env.VITE_DUETT_API_URL}/api/v1/profiles/like`;

  try {
    const response = await api.post(url, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        profileId: profileId,
      },
    });

    console.log('Response:', response.data);
  } catch (error) {
    console.error('좋아요를 하지 못했습니다:', error);
    throw new Error('좋아요를 하지 못했습니다');
  }
};
