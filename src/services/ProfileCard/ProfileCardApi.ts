import { api } from '../client';
import { ProfileCardDTO,ProfileCardSummaryDTO } from "@/type/services/ProfileCard/ProfileCard"

// 코인을 사용해서 프로필카드 상세 단일 조회하기
export const spendCoin = async (
  profileId?: number,
  
): Promise<ProfileCardDTO> => {
  const url = `${import.meta.env.VITE_DUETT_API_URL}/api/v1/profiles/${profileId}/coin`;
  try {
    const { data } = await api.get<ProfileCardDTO>(url, {
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

// 반경 내의 프로필카드 요약 목록 조회하기
export const getProfileCardData = async (
  page: number,
  size: number,
  radius : number
): Promise<ProfileCardSummaryDTO> => {
  const url = `${import.meta.env.VITE_DUETT_API_URL}/api/v1/profiles/summary?page=${page}&size=${size}&radius=${radius}`;
  try {
    const { data } = await api.get<ProfileCardSummaryDTO>(url, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_DUETT_TOKEN}`,
      },
    });
    return data;
  } catch (error) {
    console.error('에러내용:', error);
    throw new Error('Failed to fetch user info data');
  }
};

