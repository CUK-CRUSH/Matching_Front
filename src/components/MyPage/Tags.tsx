import useMyPageStore from '@/store/myPageStore';
import MatchingListHeader from '../layout/matchingListHeader';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useCookies } from 'react-cookie';
import { useQuery } from '@tanstack/react-query';
import { UserMusicTagDTO } from '@/type/services/Mypage/MypageDTO';
import { getMusicTagsData } from '@/services/Mypage/MypageAPI';

const TagsPage = () => {
  const { setCurrentPage, setSelectedMusicTag, setSelectedHobbyTag } = useMyPageStore();
  const [selectedMusicTags, setSelectedMusicTags] = useState<string[]>([]);
  const [selectedHobbyTags, setSelectedHobbyTags] = useState<string[]>([]);
  // access토큰
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;

  // 모달
  const [showAllMusicTags, setShowAllMusicTags] = useState(false);
  const [showAllHobbyTags, setShowAllHobbyTags] = useState(false);

  const { data: MusicTagsData, error } = useQuery<UserMusicTagDTO>({
    queryKey: ['MusicTagsData'],
    queryFn: () => getMusicTagsData(accessToken),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (MusicTagsData) {
      const initialMusicTags = MusicTagsData.musicTags
        .filter((tag) => tag.state === 'STANDARD' || tag.state === 'FEATURED')
        .map((tag) => tag.name);
      const initialHobbyTags = MusicTagsData.hobbyTags
        .filter((tag) => tag.state === 'STANDARD' || tag.state === 'FEATURED')
        .map((tag) => tag.name);
      setSelectedMusicTags(initialMusicTags);
      setSelectedHobbyTags(initialHobbyTags);
    }
  }, [MusicTagsData]);

  const handleMusicTagClick = (tag: string) => {
    setSelectedMusicTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      } else if (prev.length < 3) {
        return [...prev, tag];
      } else {
        return prev; // 이미 3개 선택된 경우 아무 것도 하지 않음
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
        return prev; // 이미 3개 선택된 경우 아무 것도 하지 않음
      }
    });
  };

  const handleSaveTags = () => {
    if (MusicTagsData) {
      setSelectedMusicTag(selectedMusicTags);
      setSelectedHobbyTag(selectedHobbyTags);

      // 태그 상태 설정
      const updatedMusicTags = MusicTagsData.musicTags.map((tag) => ({
        name: tag.name,
        state: selectedMusicTags.includes(tag.name) ? 'STANDARD' : 'NONE',
      }));
      const updatedHobbyTags = MusicTagsData.hobbyTags.map((tag) => ({
        name: tag.name,
        state: selectedHobbyTags.includes(tag.name) ? 'STANDARD' : 'NONE',
      }));

      console.log('Updated Music Tags:', updatedMusicTags);
      console.log('Updated Hobby Tags:', updatedHobbyTags);

      // 여기에 실제로 업데이트하는 코드를 추가해야 합니다. (API 호출 등)

      setCurrentPage('introduce');
    } else {
      console.error('MusicTagsData is undefined');
    }
  };

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
