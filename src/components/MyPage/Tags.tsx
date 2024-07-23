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

      const updatedIntroData: UserIntroDTO = {
        mbti:
          `${selectedMBTI.E_I || ''}${selectedMBTI.N_S || ''}${selectedMBTI.F_T || ''}${selectedMBTI.J_P || ''}` ||
          null,
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
        <MatchingListHeader text="태그 설정" onStateChange={() => setCurrentPage('introduce')} />

        <div className="flex flex-col p-4 space-y-4">
          <div className="flex flex-col">
            <span className="text-lg font-bold">음악 태그 (최대 3개)</span>
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
                className="mt-2 bg-white text-black"
                onClick={() => setShowAllMusicTags(!showAllMusicTags)}
              >
                {showAllMusicTags ? '접기' : '더보기'}
              </Button>
            )}
          </div>

          <div className="flex flex-col">
            <span className="text-lg font-bold">취미 태그 (최대 3개)</span>
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
                className="mt-2 bg-white text-black"
                onClick={() => setShowAllHobbyTags(!showAllHobbyTags)}
              >
                {showAllHobbyTags ? '접기' : '더보기'}
              </Button>
            )}
          </div>

          <Button className="mt-4 bg-white text-black" onClick={handleSaveTags}>
            저장하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TagsPage;
