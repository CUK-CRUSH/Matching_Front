// Type definitions for individual music items
export type MusicDTO = {
  videoId: string;
  title: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  channelTitle: string;
};

// Type definitions for the response from YouTube API
export type YoutubeMusicDataDTO = {
  status: number;
  message: string;
  data: MusicDTO[];
};

// MusicDTO.ts
export type MusicItem = {
  musicId?: number;
  title: string;
  artist: string;
  videoId: string;
};

// Type definition for the request body
export type MusicTasteRequestDTO = {
  createLifeMusics?: MusicItem[];
  updateLifeMusics?: MusicItem[];
  deleteLifeMusics?: { musicId: number }[];
};

// Type definition for the API response
export type ApiResponse<T> = {
  data: T;
};

export type LifeMusicItem = {
  musicId?: number;
  title: string;
  artist: string;
  videoId: string;
};

// Type definitions for mood object (used in user profile)
export type MoodItem = {
  title: string;
  artist: string;
  moodImageUrl: string;
  isDeleteImage: boolean;
};

// Type definitions for music taste data (user profile data)
export type MusicTasteDataDTO = {
  lifeMusics: LifeMusicItem[];
  mood: MoodItem;
};

export type MoodDataDTO = {
  title: string;
  artist: string;
  moodImage?: string;
};