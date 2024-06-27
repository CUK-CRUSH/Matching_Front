export type MusicDTO = {
  id: string;
  title: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  channelTitle: string;
};

export type YoutubeMusicDataDTO = {
  status: number;
  message: string;
  data: MusicDTO[];
};
