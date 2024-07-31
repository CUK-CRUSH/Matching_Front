import useMyPageStore from '@/store/myPageStore';
import MatchingListHeader from '../layout/matchingListHeader';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  HobbyTagDTO,
  MusicTagDTO,
  TagsState,
  UserIntroDTO,
  UserMusicTagDTO,
} from '@/type/services/Mypage/MypageDTO';
import {
  getMusicTagsData,
  getUserIntroData,
  patchUserIntroData,
} from '@/services/Mypage/MypageAPI';
import UseAccessToken from '@/hooks/useAccessToken';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const TagsPage = () => {
  const { setCurrentPage, selectedMBTI, textarea1, textarea2 } = useMyPageStore();
  const [selectedMusicTags, setSelectedMusicTags] = useState<string[]>([]);
  const [selectedHobbyTags, setSelectedHobbyTags] = useState<string[]>([]);

  const accessToken = UseAccessToken();

  const queryClient = useQueryClient();

  const [showAllMusicTags, setShowAllMusicTags] = useState(false);
  const [showAllHobbyTags, setShowAllHobbyTags] = useState(false);

  const { data: MusicTagsData, error } = useQuery<UserMusicTagDTO>({
    queryKey: ['MusicTagsData'],
    queryFn: () => getMusicTagsData(accessToken),
    staleTime: 1000 * 60 * 5,
  });

  const { data: IntroData } = useQuery<UserIntroDTO>({
    queryKey: ['IntroData'],
    queryFn: () => getUserIntroData(accessToken),
    staleTime: 1000 * 60 * 5,
  });

  const mutation = useMutation({
    mutationFn: (introData: UserIntroDTO) => patchUserIntroData(accessToken, introData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['MusicTagsData'] });
      queryClient.invalidateQueries({ queryKey: ['IntroData'] });
      setCurrentPage('introduce');
    },
  });

  useEffect(() => {
    if (MusicTagsData) {
      const initialSelectedMusicTags = MusicTagsData.musicTags
        .filter((tag) => tag.state === 'STANDARD' || tag.state === 'FEATURED')
        .map((tag) => tag.name);
      setSelectedMusicTags(initialSelectedMusicTags);
      const initialSelectedHobbyTags = MusicTagsData.hobbyTags
        .filter((tag) => tag.state === 'STANDARD' || tag.state === 'FEATURED')
        .map((tag) => tag.name);
      setSelectedHobbyTags(initialSelectedHobbyTags);
    }
  }, [MusicTagsData]);

  if (error) {
    return <div>Error loading tags</div>;
  }

  if (!MusicTagsData) {
    return <div>Loading...</div>;
  }

  const availableMusicTags = MusicTagsData.musicTags
    ? MusicTagsData.musicTags.map((tag) => tag.name)
    : [];
  const availableHobbyTags = MusicTagsData.hobbyTags
    ? MusicTagsData.hobbyTags.map((tag) => tag.name)
    : [];

  const handleMusicTagClick = (tag: string) => {
    setSelectedMusicTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      } else if (prev.length < 3) {
        return [...prev, tag];
      } else {
        return prev;
      }
    });
  };

  const handleHobbyTagClick = (tag: string) => {
    setSelectedHobbyTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      } else if (prev.length < 3) {
        return [...prev, tag];
      } else {
        return prev;
      }
    });
  };

  const handleSaveTags = () => {
    if (selectedMusicTags.length < 3 || selectedHobbyTags.length < 3) {
      return;
    }

    if (MusicTagsData && IntroData) {
      const updatedMusicTags: MusicTagDTO[] = MusicTagsData.musicTags.map((tag) => ({
        ...tag,
        state: selectedMusicTags.includes(tag.name)
          ? ('STANDARD' as TagsState)
          : tag.state === 'FEATURED'
            ? 'FEATURED'
            : 'NONE',
      }));

      const updatedHobbyTags: HobbyTagDTO[] = MusicTagsData.hobbyTags.map((tag) => ({
        ...tag,
        state: selectedHobbyTags.includes(tag.name)
          ? ('STANDARD' as TagsState)
          : tag.state === 'FEATURED'
            ? 'FEATURED'
            : 'NONE',
      }));

      // Check if all MBTI fields are filled
      const mbtiString = `${selectedMBTI.E_I || ''}${selectedMBTI.N_S || ''}${selectedMBTI.F_T || ''}${selectedMBTI.J_P || ''}`;
      const mbti = mbtiString.length === 4 ? mbtiString : null;

      const updatedIntroData: UserIntroDTO = {
        mbti,
        musicTags: updatedMusicTags,
        hobbyTags: updatedHobbyTags,
        selfIntroduction: textarea1 || null,
        likeableMusicTaste: textarea2 || null,
      };

      mutation.mutate(updatedIntroData);
    } else {
      console.error('MusicTagsData or IntroData is undefined');
    }
  };

  return (
    <div className="text-white h-full flex flex-col items-center overflow-y-auto scrollbar-hide">
      <div className="w-full max-w-md mx-auto flex flex-col h-full">
        <MatchingListHeader
          onStateChange={() => setCurrentPage('introduce')}
          background="#252525"
        />
        <div className="mb-10 mx-2 flex flex-col">
          <div className="mt- space-y-2">
            <p className="flex-grow-0 flex-shrink-0 text-2xl font-bold text-left text-[#f9f9f9]">
              <span className="flex-grow-0 flex-shrink-0 text-2xl font-bold text-left text-[#f9f9f9]">
                나를 표현하는
              </span>
              <br />
              <span className="flex-grow-0 flex-shrink-0 text-2xl font-bold text-left text-[#f9f9f9]">
                태그를 골라주세요
              </span>
            </p>
            <p className="flex-grow-0 flex-shrink-0 text-base font-medium text-left text-[#f8f8f8]">
              카테고리(음악/취미)당 3개씩 눌러 선택해주세요
            </p>
          </div>
          <div className="flex flex-col p-4 space-y-4">
            <div className="flex flex-col">
              <span className="text-lg font-bold">음악</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {availableMusicTags
                  .slice(0, showAllMusicTags ? availableMusicTags.length : 15)
                  .map((tag) => (
                    <Button
                      key={tag}
                      variant="outline"
                      className={`${
                        selectedMusicTags.includes(tag) ? 'bg-white text-black' : 'bg-[#1c1c1c]'
                      } rounded-3xl`}
                      onClick={() => handleMusicTagClick(tag)}
                      disabled={!selectedMusicTags.includes(tag) && selectedMusicTags.length >= 3}
                    >
                      {tag}
                    </Button>
                  ))}
              </div>
              {availableMusicTags.length > 15 && (
                <Button
                  className="mt-2 bg-[#303030] text-white rounded-3xl"
                  onClick={() => setShowAllMusicTags(!showAllMusicTags)}
                  variant={'noHover'}
                >
                  {showAllMusicTags ? '접기' : '더보기 +'}
                </Button>
              )}
              {selectedMusicTags.length < 3 && (
                <p className="text-red-500 mt-2">
                  <ErrorOutlineIcon fontSize="small" /> 태그 3개를 선택해주세요
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <span className="text-lg font-bold">취미</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {availableHobbyTags
                  .slice(0, showAllHobbyTags ? availableHobbyTags.length : 13)
                  .map((tag) => (
                    <Button
                      key={tag}
                      variant="outline"
                      className={`${
                        selectedHobbyTags.includes(tag) ? 'bg-white text-black' : 'bg-[#1c1c1c]'
                      } rounded-3xl`}
                      onClick={() => handleHobbyTagClick(tag)}
                      disabled={!selectedHobbyTags.includes(tag) && selectedHobbyTags.length >= 3}
                    >
                      {tag}
                    </Button>
                  ))}
              </div>
              {availableHobbyTags.length > 13 && (
                <Button
                  className="mt-2 bg-[#303030] text-white rounded-3xl"
                  onClick={() => setShowAllHobbyTags(!showAllHobbyTags)}
                  variant={'noHover'}
                >
                  {showAllHobbyTags ? '접기' : '더보기 +'}
                </Button>
              )}
              {selectedHobbyTags.length < 3 && (
                <p className="text-red-500 mt-2">
                  <ErrorOutlineIcon fontSize="small" /> 태그 3개를 선택해주세요
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Button
              className={`my-4 bg-[#303030] text-white rounded-3xl w-auto px-20 py-7 mb-2 ${selectedMusicTags.length >= 3 && selectedHobbyTags.length >= 3 ? '' : 'cursor-not-allowed opacity-50'}`}
              onClick={handleSaveTags}
              variant={'noHover'}
              disabled={selectedMusicTags.length < 3 || selectedHobbyTags.length < 3} // 비활성화 상태 설정
            >
              완료
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagsPage;
