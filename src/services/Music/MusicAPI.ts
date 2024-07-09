import {
  MoodDataDTO,
  MusicTasteDataDTO,
  MusicTasteRequestDTO,
  YoutubeMusicDataDTO,
} from '@/type/services/Music/MusicDTO';
import { api } from '../client';
import { Base64ToBlob } from '@/utils/Base64ToBlob';

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

// 음악 취향 데이터 저장, 삭제
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

// 음악 Mood 데이터 저장, 수정, 삭제
export const postUserMoodData = async (accessToken: string, moodData: MoodDataDTO) => {
  const formData = new FormData();
  const url = `${import.meta.env.VITE_DUETT_API_URL}/api/v1/profiles/moods`;

  formData.append('title', moodData.title);
  formData.append('artist', moodData.artist);

  if (moodData.moodImage && moodData.moodImage.includes(',')) {
    const contentType = moodData.moodImage.split(';')[0].split(':')[1];
    const blob = Base64ToBlob(moodData.moodImage, contentType);
    formData.append('moodImage', blob, 'moodImage.jpg');
  }

  formData.append('isDeleteImage', String(moodData.isDeleteImage));

  try {
    const response = await api.post(url, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error posting music taste data:', error);
    throw new Error('Failed to post music taste data');
  }
};
