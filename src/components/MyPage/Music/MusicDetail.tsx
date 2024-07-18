import useMyPageStore from '@/store/myPageStore';
import MatchingListHeader from '../../layout/matchingListHeader';
import { useForm } from 'react-hook-form';
import { LifeMusicItem, MusicDTO, YoutubeMusicDataDTO } from '@/type/services/Music/MusicDTO';
import { getYoutubeMusicData } from '@/services/Music/MusicAPI';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import UseAccessToken from '@/hooks/useAccessToken';

const MusicDetailPage = () => {
  const { setCurrentPage, selectedMusic, setSelectedMusic } = useMyPageStore();
  const accessToken = UseAccessToken();
  const { register, handleSubmit, watch } = useForm<{ query: string }>();
  const query = watch('query');
  const [selectedItem, setSelectedItem] = useState<MusicDTO | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const {
    data: musicDetailData,
    error,
    refetch,
  } = useQuery<YoutubeMusicDataDTO>({
    queryKey: ['musicDetailData'],
    queryFn: () => getYoutubeMusicData(accessToken, query, 5),
    staleTime: 1000 * 60 * 5,
    enabled: false,
  });

  const onSubmit = async () => {
    await refetch();
    setIsDropdownOpen(true);
  };

  const handleSelectItem = (item: MusicDTO) => {
    setSelectedItem(item);
    setIsDropdownOpen(false);
  };

  const handleComplete = () => {
    if (selectedItem) {
      const newMusic: LifeMusicItem = {
        title: selectedItem.title,
        artist: selectedItem.channelTitle,
        url: selectedItem.thumbnail.url,
      };
      setSelectedMusic([...selectedMusic, newMusic]);
      setCurrentPage('music');
    }
  };

  if (error) {
    return <div>error</div>;
  }

  return (
    <div className="text-white h-full flex flex-col items-center pb-20">
      <div className="w-full max-w-md mx-auto mt-5">
        <MatchingListHeader
          onStateChange={() => setCurrentPage('music')}
          mypageText="My Page | 프로필 수정"
        />
        <div className="relative mx-4">
          <form onSubmit={handleSubmit(onSubmit)} className="flex items-center mt-4 relative">
            <input
              type="text"
              {...register('query', { required: true })}
              placeholder="검색어를 입력해주세요"
              className="flex-grow p-2 rounded-lg bg-black text-white pr-10 py-3"
            />
            <button type="submit" className="absolute right-2 p-2 rounded-lg text-white">
              <SearchOutlined />
            </button>
          </form>
          {isDropdownOpen && (
            <div className="absolute w-full mt-2 bg-[#2c2c2c] rounded-lg shadow-lg z-50">
              {Array.isArray(musicDetailData?.data) && musicDetailData.data.length > 0 ? (
                musicDetailData.data.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center p-2 cursor-pointer hover:bg-[#3c3c3c]"
                    onClick={() => handleSelectItem(item)}
                  >
                    <img src={item.thumbnail.url} alt={item.title} className="w-16 h-16 mr-4" />
                    <div>
                      <p className="text-lg font-bold text-white">{item.title}</p>
                      <p className="text-white">{item.channelTitle}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-2 text-white">No music data available</div>
              )}
            </div>
          )}

          {selectedItem && (
            <div className="flex flex-col justify-between h-full mt-4">
              <div className="flex-grow">
                <div className="flex flex-col items-center">
                  <div className="w-full max-w-md">
                    <label className="mb-2 block text-lg">제목</label>
                    <input
                      type="text"
                      value={selectedItem.title}
                      onChange={(e) => setSelectedItem({ ...selectedItem, title: e.target.value })}
                      className="p-2 rounded-lg bg-black text-white w-full"
                    />
                    <label className="mt-4 mb-2 block text-lg">아티스트</label>
                    <input
                      type="text"
                      value={selectedItem.channelTitle}
                      onChange={(e) =>
                        setSelectedItem({ ...selectedItem, channelTitle: e.target.value })
                      }
                      className="p-2 rounded-lg bg-black text-white w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleComplete}
                  className="p-2 rounded-lg bg-[#303030] text-white max-w-32 w-full"
                >
                  완료
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicDetailPage;
