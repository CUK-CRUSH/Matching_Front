import { api } from '../client';
import { ProfileCardDTO } from "@/type/services/ProfileCard/ProfileCard"

export const getProfileCardData = async (
  page: number,
  size: number,
  radius : number
): Promise<ProfileCardDTO> => {
  const url = `${import.meta.env.VITE_DUETT_API_URL}/api/v1/profiles/summary?page=${page}&size=${size}&radius=${radius}`;
  try {
    const { data } = await api.get<ProfileCardDTO>(url, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzMSIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJpYXQiOjE3MTk4MTM5NzUsImV4cCI6MTcyODQ1Mzk3NX0.nUKEXKeWCNvIdxEcAlrXAGYvJlmbyy1JTr5TJsQixlQ`,
      },
    });
    return data;
  } catch (error) {
    console.error('에러내용:', error);
    throw new Error('Failed to fetch user info data');
  }
};
