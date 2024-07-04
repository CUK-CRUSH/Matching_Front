import {
  MusicTasteDataDTO,
  MusicTasteRequestDTO,
  YoutubeMusicDataDTO,
} from '@/type/services/Music/MusicDTO';
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

// 음악 전체 데이터 가져오기
export const getMusicTasteData = async (accessToken: string): Promise<MusicTasteDataDTO> => {
  const url = `${import.meta.env.VITE_DUETT_API_URL}/api/v1/profiles/music-taste`;
  try {
    const { data } = await api.get<{ data: MusicTasteDataDTO }>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error('에러내용:', error);
    throw new Error('Failed to fetch user info data');
  }
};

//
export const postMusicTasteData = async (
  accessToken: string,
  musicTasteRequest: MusicTasteRequestDTO,
): Promise<void> => {
  const url = `${import.meta.env.VITE_DUETT_API_URL}/api/v1/profiles/musics`;

  try {
    const response = await api.post(url, musicTasteRequest, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error posting music taste data:', error);
    throw new Error('Failed to post music taste data');
  }
};
