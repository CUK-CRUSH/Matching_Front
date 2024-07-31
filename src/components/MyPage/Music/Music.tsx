import { useEffect, useState } from 'react';
import useMyPageStore from '@/store/myPageStore';
import MatchingListHeader from '../../layout/matchingListHeader';
import { Button } from '@/components/ui/button';
import {
  LifeMusicItem,
  MusicTasteDataDTO,
  MusicTasteRequestDTO,
} from '@/type/services/Music/MusicDTO';
import { getMusicTasteData, postMusicTasteData } from '@/services/Music/MusicAPI';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import MusicNote from '@/assets/Music/Note.svg';
import MusicEdit from '@/assets/Music/MusicEdit.svg';
import MusicDelete from '@/assets/Music/MusicDelete.svg';
import MusicMood from '@/assets/Music/MusicMood.svg';
import TrashCan from '@/assets/Icon/TrashCan.svg';
import MusicMarker from '@/assets/Music/MusicMarker.svg';
import CommonModal from '@/utils/CommonModal';
import UseAccessToken from '@/hooks/useAccessToken';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const MusicPage = () => {
  const {
    setCurrentPage,
    selectedMusic,
    setSelectedMusic,
    setDeleteLifeMusics,
    deleteLifeMusics,
    setUpdateLifeMusics,
    setCurrentMusic,
  } = useMyPageStore();
  const accessToken = UseAccessToken();

  const [open, setOpen] = useState<boolean>(false);
  const [selectedMusicId, setSelectedMusicId] = useState<number | null>(null);

  const queryClient = useQueryClient();

  const { data: musicTasteData } = useQuery<MusicTasteDataDTO>({
    queryKey: ['musicTasteData'],
    queryFn: () => getMusicTasteData(accessToken),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (musicTasteData && selectedMusic.length === 0 && deleteLifeMusics.length === 0) {
      setSelectedMusic(musicTasteData.lifeMusics);
    }
  }, [musicTasteData, selectedMusic.length, deleteLifeMusics.length, setSelectedMusic]);

  // 음악 데이터 저장 후 새로고침
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
      queryClient.invalidateQueries({ queryKey: ['mainData'] });
      setDeleteLifeMusics([]);
      setUpdateLifeMusics([]);
      setCurrentPage('mypage');
    },
  });

  // 음악 추가 페이지 이동
  const handleAddMusicClick = () => {
    setCurrentMusic(null);
    setCurrentPage('musicDetail');
  };

  // Mood 추가 페이지 이동
  const handleAddMoodClick = () => {
    setCurrentPage('mood');
  };

  const handleOpenDeleteModal = (musicId: number) => {
    setSelectedMusicId(musicId);
    setOpen(true);
  };

  // 저장된 음악 삭제
  const handleRemoveSavedMusicClick = (musicId: number) => {
    setDeleteLifeMusics([...deleteLifeMusics, musicId]);
    const updatedMusic = selectedMusic.filter((item) => item.musicId !== musicId);
    setSelectedMusic([...updatedMusic]);
    setOpen(false);
  };

  // 미저장된 음악 삭제
  const handleRemoveUnsavedMusicClick = (index: number) => {
    const updatedMusic = selectedMusic.filter((_, i) => i !== index);
    setSelectedMusic([...updatedMusic]);
  };

  // 수정하기
  const handleUpdateMusicClick = (music: LifeMusicItem) => {
    setCurrentMusic(music);
    setCurrentPage('musicEdit');
  };

  // 데이터 저장(추가, 수정, 삭제)
  const handleSaveMusic = async () => {
    const createLifeMusics = selectedMusic.filter((item) => !item.musicId);
    const updateLifeMusics = selectedMusic.filter(
      (item) => item.musicId && !deleteLifeMusics.includes(item.musicId),
    );

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
      <div className="w-full max-w-md mx-auto mt-5 flex flex-col justify-stretch">
        <MatchingListHeader
          onStateChange={() => setCurrentPage('mypage')}
          text="음악취향 설정"
          mypageText="My Page | 프로필 수정"
        />
        {/* 선호 음악추가하기  */}
        <div className="mx-4">
          <div className="mt-5">
            <span className="text-lg font-bold">나의 인생곡은? {selectedMusic.length}/3</span>
            {selectedMusic.length === 0 ? (
              <div className="mt-5 flex justify-center">
                <Button
                  onClick={handleAddMusicClick}
                  variant={'noHover'}
                  className="bg-[#303030] w-11/12 p-10 rounded"
                >
                  <div className="flex flex-col space-y-2 items-center justify-center">
                    <img src={MusicNote} alt="MusicNote" />
                    <span>음악 추가하기</span>
                  </div>
                </Button>
              </div>
            ) : (
              <>
                <div className="flex flex-col w-full text-m items-center justify-center mt-5">
                  {selectedMusic.map((music, index) => (
                    <div
                      key={music.musicId || index}
                      className="flex justify-between w-11/12 h-12 mb-4 bg-white text-black rounded relative"
                    >
                      <div className="w-1/12 mx-2 flex items-center justify-center relative">
                        {!music.musicId && (
                          <img
                            src={MusicMarker}
                            alt="MusicMarker"
                            className="absolute top-1 left-0 transform -translate-y-1/2"
                            style={{ width: '16px', height: '16px' }} // Adjust size as necessary
                          />
                        )}
                        {music.musicId && (
                          <img
                            onClick={() => handleUpdateMusicClick(music)}
                            src={MusicEdit}
                            alt="MusicEdit"
                            className="cursor-pointer"
                          />
                        )}
                      </div>
                      <div className="w-7/12 mx-2 flex items-center justify-center overflow-hidden">
                        <span className="truncate">{music.title}</span>
                      </div>
                      <div className="w-3/12 mx-2 flex items-center justify-center overflow-hidden">
                        <span className="truncate">{music.artist}</span>
                      </div>
                      <div className="w-1/12 mx-2 flex items-center justify-center">
                        {music.musicId ? (
                          <>
                            <img
                              onClick={() => handleOpenDeleteModal(music.musicId!)} // Pass musicId here
                              src={MusicDelete}
                              alt="MusicDelete"
                              className="cursor-pointer"
                            />
                            {open &&
                              selectedMusicId === music.musicId && ( // Show modal only for the selected music item
                                <CommonModal
                                  imageSrc={TrashCan}
                                  mainText="삭제 하시겠습니까?"
                                  subText="이후 복구되지 않습니다."
                                  cancelText="취소"
                                  confirmText="확인"
                                  onCancel={() => setOpen(false)}
                                  onConfirm={() => handleRemoveSavedMusicClick(music.musicId!)}
                                />
                              )}
                          </>
                        ) : (
                          <img
                            onClick={() => handleRemoveUnsavedMusicClick(index)}
                            src={MusicDelete}
                            alt="MusicDelete"
                            className="cursor-pointer"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {selectedMusic.length < 3 && (
                  <div className="mt-5 flex justify-center">
                    <Button
                      onClick={handleAddMusicClick}
                      variant={'noHover'}
                      className="bg-[#303030] w-11/12 p-6 rounded"
                    >
                      <div className="flex flex-row space-x-2 items-center justify-center">
                        <img src={MusicNote} alt="MusicNote" className="h-4 w-4" />
                        <span>음악 추가하기</span>
                      </div>
                    </Button>
                  </div>
                )}
              </>
            )}
            {selectedMusic.length < 3 && (
              <div className="text-red-500 mt-3">
                <p>
                  <ErrorOutlineIcon fontSize="small" /> 나의 인생곡은 3개를 추가해주세요
                </p>
              </div>
            )}
          </div>

          {/* Mood */}
          <div className="mt-5">
            <p className="text-lg font-bold">연인과 함께 듣고싶은 곡, 어울리는 이미지로</p>
            <p className="text-lg font-bold">나의 mood를 설정해보세요</p>

            <div className="mt-5">
              <div className="mt-5 flex justify-center">
                <Button onClick={handleAddMoodClick} variant={'noHover'} className="h-40 w-full">
                  {musicTasteData?.mood?.moodImageUrl ? (
                    <img
                      src={musicTasteData.mood.moodImageUrl}
                      alt="Selected"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col space-y-2 items-center justify-center bg-[#303030] w-11/12 p-10 rounded">
                      <img src={MusicMood} alt="MusicNote" className="h-8 w-8" />
                      <span>이미지 추가하기</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>
          {/* 저장버튼 */}

          <div className="flex justify-center items-center">
            <button
              className={`bg-white text-black w-11/12 py-2 px-4 rounded mt-5 ${
                selectedMusic.length < 3 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleSaveMusic}
              disabled={selectedMusic.length < 3}
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
