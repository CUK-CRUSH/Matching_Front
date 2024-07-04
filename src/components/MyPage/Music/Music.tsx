import useMyPageStore from '@/store/myPageStore';
import MatchingListHeader from '../../layout/matchingListHeader';
import { useCookies } from 'react-cookie';
import { Button } from '@/components/ui/button';
import {
  LifeMusicItem,
  MusicTasteDataDTO,
  MusicTasteRequestDTO,
} from '@/type/services/Music/MusicDTO';
import { getMusicTasteData, postMusicTasteData } from '@/services/Music/MusicAPI';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const MusicPage = () => {
  const { setCurrentPage, selectedMusic, setSelectedMusic } = useMyPageStore();
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;

  const queryClient = useQueryClient();

  const [deleteLifeMusics, setDeleteLifeMusics] = useState<number[]>([]);
  const [updateLifeMusics, setUpdateLifeMusics] = useState<LifeMusicItem[]>([]);

  const { data: musicTasteData, isLoading: isFetching } = useQuery<MusicTasteDataDTO>({
    queryKey: ['musicTasteData'],
    queryFn: () => getMusicTasteData(accessToken),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (musicTasteData && selectedMusic.length === 0) {
      setSelectedMusic(musicTasteData.lifeMusics);
    }
  }, [musicTasteData, selectedMusic.length, setSelectedMusic]);

  const mutation = useMutation({
    mutationFn: (musicTasteRequest: MusicTasteRequestDTO) =>
      postMusicTasteData(accessToken, musicTasteRequest),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['musicTasteData'] }).then(() => {
        const updatedMusicTasteData = queryClient.getQueryData<MusicTasteDataDTO>([
          'musicTasteData',
        ]);
        if (updatedMusicTasteData) {
          setSelectedMusic(updatedMusicTasteData.lifeMusics);
        }
      });
      setDeleteLifeMusics([]);
      setUpdateLifeMusics([]);
    },
  });

  const handleAddMusicClick = () => {
    setCurrentPage('musicDetail');
  };

  const handleRemoveMusicClick = (musicId: number | undefined) => {
    if (musicId) {
      setDeleteLifeMusics((prev) => [...prev, musicId]);
    }
    const updatedMusic = selectedMusic.filter((item) => item.musicId !== musicId);

    setSelectedMusic(updatedMusic);
  };

  const handleUpdateMusicClick = (music: LifeMusicItem) => {
    setUpdateLifeMusics((prev) => [...prev, music]);
    // setCurrentPage('musicDetail'); // 이걸로 수정 페이지로 이동하는 논리를 추가할 수 있습니다.
  };

  const handleSaveMusic = async () => {
    const createLifeMusics = selectedMusic.filter((item) => !item.musicId);

    const musicTasteRequest: MusicTasteRequestDTO = {
      createLifeMusics: createLifeMusics.length > 0 ? createLifeMusics : undefined,
      updateLifeMusics: updateLifeMusics.length > 0 ? updateLifeMusics : undefined,
      deleteLifeMusics:
        deleteLifeMusics.length > 0 ? deleteLifeMusics.map((id) => ({ musicId: id })) : undefined,
    };

    try {
      await mutation.mutateAsync(musicTasteRequest);
      console.log('Music data saved successfully');
    } catch (error) {
      console.error('Failed to save music data:', error);
    }
  };

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
                  <div className="flex items-center">
                    {music.musicId && (
                      <Button
                        onClick={() => handleUpdateMusicClick(music)}
                        className="bg-blue-500 p-2 rounded mx-1"
                      >
                        <i className="material-icons">edit</i>
                      </Button>
                    )}
                    <Button
                      onClick={() => handleRemoveMusicClick(music.musicId)}
                      className="bg-red-500 p-2 rounded"
                    >
                      <i className="material-icons">close</i>
                    </Button>
                  </div>
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
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={handleSaveMusic}
        // disabled={mutation.status}
      >
        저장
      </button>
    </div>
  );
};

export default MusicPage;
