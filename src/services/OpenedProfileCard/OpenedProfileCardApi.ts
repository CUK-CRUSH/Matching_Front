import { api } from '../client';
import { OpenedProfileCardDTO } from '@/type/services/OpenedProfileCard/OpenedProfileCard'

// 코인을 사용해서 프로필카드 상세 단일 조회하기
export const getOpenedProfileCard = async (
  page?: number,
  size?: number,

): Promise<OpenedProfileCardDTO> => {

  const url = `${import.meta.env.VITE_DUETT_API_URL}/api/v1/profiles/unlocks?page=${page}&size=${size}`;
  try {
    const { data } = await api.get<OpenedProfileCardDTO>(url, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_DUETT_TOKEN}`,
      },
    });
    return data;
  } catch (error) {
    console.error('에러내용:', error);
    throw new Error('코인 사용 실패');
  }
};