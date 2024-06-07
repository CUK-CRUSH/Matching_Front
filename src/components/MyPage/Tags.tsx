import useMyPageStore from '@/store/myPageStore';
import MatchingListHeader from '../layout/matchingListHeader';
import { useState } from 'react';
import { Button } from '../ui/button';

const availableMusicTags = ['Rock', 'Pop', 'Jazz', 'Classical', 'Hip-hop', 'Country'];
const availableHobbyTags = ['Reading', 'Gaming', 'Cooking', 'Traveling', 'Sports', 'Painting'];

const TagsPage = () => {
  const { setCurrentPage, setSelectedMusicTag, setSelectedHobbyTag } = useMyPageStore();
  const [selectedMusicTags, setSelectedMusicTags] = useState<string[]>([]);
  const [selectedHobbyTags, setSelectedHobbyTags] = useState<string[]>([]);

  const handleMusicTagClick = (tag: string) => {
    setSelectedMusicTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : prev.length < 3 ? [...prev, tag] : prev,
    );
  };

  const handleHobbyTagClick = (tag: string) => {
    setSelectedHobbyTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : prev.length < 3 ? [...prev, tag] : prev,
    );
  };

  const handleSaveTags = () => {
    setSelectedMusicTag(selectedMusicTags);
    setSelectedHobbyTag(selectedHobbyTags);
    setCurrentPage('introduce');
  };

  return (
    <div className="text-white h-full flex flex-col items-center overflow-y-auto scrollbar-hide">
      <div className="w-full max-w-md mx-auto flex flex-col h-full">
        <MatchingListHeader text="태그 설정" onStateChange={() => setCurrentPage('introduce')} />

        <div className="flex flex-col p-4 space-y-4">
          <div className="flex flex-col">
            <span className="text-lg font-bold">음악 태그 (최대 3개)</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {availableMusicTags.map((tag) => (
                <Button
                  key={tag}
                  variant="outline"
                  className={`${selectedMusicTags.includes(tag) ? 'bg-white text-black' : 'bg-[#1c1c1c]'} rounded-3xl`}
                  onClick={() => handleMusicTagClick(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-lg font-bold">취미 태그 (최대 3개)</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {availableHobbyTags.map((tag) => (
                <Button
                  key={tag}
                  variant="outline"
                  className={`${selectedHobbyTags.includes(tag) ? 'bg-white text-black' : 'bg-[#1c1c1c]'} rounded-3xl`}
                  onClick={() => handleHobbyTagClick(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
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
