import useMyPageStore from '@/store/myPageStore';
import MatchingListHeader from '../../layout/matchingListHeader';
import { useCookies } from 'react-cookie';
import { Button } from '@/components/ui/button';
import {
  MusicTasteDataDTO,
  MusicTasteRequestDTO,
  LifeMusicItem,
} from '@/type/services/Music/MusicDTO';
import { getMusicTasteData, postMusicTasteData } from '@/services/Music/MusicAPI';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const MusicPage = () => {
  const { setCurrentPage, selectedMusic, setSelectedMusic } = useMyPageStore();
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;

  const { data: musicTasteData } = useQuery<MusicTasteDataDTO>({
    queryKey: ['musicTasteData'],
    queryFn: () => getMusicTasteData(accessToken),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (musicTasteData && selectedMusic.length === 0) {
      setSelectedMusic(musicTasteData.lifeMusics);
    }
  }, [musicTasteData, selectedMusic.length, setSelectedMusic]);

  const handleAddMusicClick = () => {
    setCurrentPage('musicDetail');
  };

  const handleRemoveMusicClick = (musicId: number) => {
    const updatedMusic = selectedMusic.filter((item) => item.musicId !== musicId);
    setSelectedMusic(updatedMusic);
    console.log(updatedMusic);
  };

  const handleSaveMusic = async () => {
    const createLifeMusics = selectedMusic.filter((item) => !item.musicId);
    const updateLifeMusics = selectedMusic.filter((item) => item.musicId);

    const musicTasteRequest: MusicTasteRequestDTO = {
      createLifeMusics: createLifeMusics.length > 0 ? createLifeMusics : undefined,
      updateLifeMusics: updateLifeMusics.length > 0 ? updateLifeMusics : undefined,
      deleteLifeMusics: [],
    };

    try {
      await postMusicTasteData(accessToken, musicTasteRequest);
      console.log('Music data saved successfully');
    } catch (error) {
      console.error('Failed to save music data:', error);
    }
  };

  const handleAddMockMusic = () => {
    const mockMusic: LifeMusicItem = {
      title: 'Mock Song',
      artist: 'Mock Artist',
      url: 'https://mock-url.com',
    };
    setSelectedMusic([...selectedMusic, mockMusic]);
  };

  console.log('Selected Music:', selectedMusic);

  return (
    <div className="text-white h-full flex flex-col items-center pb-20">
      <div className="w-full max-w-md mx-auto mt-5">
        <MatchingListHeader
          onStateChange={() => setCurrentPage('mypage')}
          text="음악취향 설정"
          mypageText="My Page | 프로필 수정"
        />

        <div className="mt-5">
          <span className="text-lg font-bold">나의 인생곡은? {selectedMusic.length}/3</span>
          {selectedMusic.length === 0 ? (
            <div className="mt-5 flex justify-center">
              <Button onClick={handleAddMusicClick} className="bg-gray-800 p-4 rounded">
                <div className="flex items-center">
                  <i className="material-icons">music_note</i>
                  <span>음악 추가하기</span>
                </div>
              </Button>
            </div>
          ) : (
            <div className="mt-5">
              {selectedMusic.map((music, index) => (
                <div
                  key={music.musicId || index}
                  className="flex items-center justify-between mb-4 p-2 bg-gray-800 rounded"
                >
                  <span>
                    {music.title} - {music.artist}
                  </span>
                  <Button
                    onClick={() => handleRemoveMusicClick(music.musicId!)}
                    className="bg-red-500 p-2 rounded"
                  >
                    <i className="material-icons">close</i>
                  </Button>
                </div>
              ))}
              {selectedMusic.length < 3 && (
                <Button onClick={handleAddMusicClick} className="bg-gray-800 p-4 rounded w-full">
                  <div className="flex items-center justify-center">
                    <i className="material-icons">music_note</i>
                    <span>음악 추가하기</span>
                  </div>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleSaveMusic}>
        저장
      </button>
      <button
        className="bg-green-500 text-white py-2 px-4 rounded mt-2"
        onClick={handleAddMockMusic}
      >
        Add Mock Music
      </button>
    </div>
  );
};

export default MusicPage;
