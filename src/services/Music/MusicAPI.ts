import { YoutubeMusicDataDTO } from '@/type/services/Music/MusicDTO';
import { api } from '../client';

// 유튜브 음악 가져오기
export const getYoutubeMusicData = async (
  accessToken: string,
  q: string,
  maxResults?: number,
): Promise<YoutubeMusicDataDTO> => {
  const url = `${import.meta.env.VITE_DUETT_API_URL}/api/v1/search/video?q=${q}&maxResults=${maxResults}`;
  try {
    const { data } = await api.get<YoutubeMusicDataDTO>(url, {
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
