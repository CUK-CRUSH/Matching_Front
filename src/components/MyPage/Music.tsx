import useMyPageStore from '@/store/myPageStore';
import MatchingListHeader from '../layout/matchingListHeader';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { MusicDTO, YoutubeMusicDataDTO } from '@/type/services/Music/MusicDTO';
import { getYoutubeMusicData } from '@/services/Music/MusicAPI';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const MusicPage = () => {
  const { setCurrentPage } = useMyPageStore();
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;
  const { register, handleSubmit, watch } = useForm<{ query: string }>();
  const query = watch('query');
  const [selectedItem, setSelectedItem] = useState<MusicDTO | null>(null);

  const {
    data: musicData,
    error,
    refetch,
  } = useQuery<YoutubeMusicDataDTO>({
    queryKey: ['userData'],
    queryFn: () => getYoutubeMusicData(accessToken, query, 5),
    staleTime: 1000 * 60 * 5,
    enabled: false, // Disable automatic refetching
    placeholderData: (previousData) => previousData,
  });

  const onSubmit = async () => {
    await refetch();
  };

  const handleSelectItem = (item: MusicDTO) => {
    setSelectedItem(item);
  };

  if (error) {
    return <div>error</div>;
  }

  return (
    <div className="text-white h-full flex flex-col items-center pb-20">
      <div className="w-full max-w-md mx-auto">
        <MatchingListHeader
          onStateChange={() => setCurrentPage('mypage')}
          mypageText="My Page | 프로필 수정"
        />
        <div className="mx-4">
          <form onSubmit={handleSubmit(onSubmit)} className="flex items-center mt-4">
            <input
              type="text"
              {...register('query', { required: true })}
              placeholder="입력된 검색어"
              className="flex-grow p-2 rounded-lg bg-gray-800 text-white"
            />
            <button
              type="submit"
              className="ml-2 p-2 bg-blue-500 rounded-lg hover:bg-blue-600 text-white"
            >
              ▶️
            </button>
          </form>
          <div className="mt-4 w-full max-w-md">
            {Array.isArray(musicData?.data) && musicData.data.length > 0 ? (
              musicData.data.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center mt-4 cursor-pointer"
                  onClick={() => handleSelectItem(item)}
                >
                  <img src={item.thumbnail.url} alt={item.title} className="w-16 h-16 mr-4" />
                  <div>
                    <p className="text-lg font-bold">{item.title}</p>
                    <p className="text-gray-400">{item.channelTitle}</p>
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
          {selectedItem && (
            <div className="mt-4 w-full max-w-md">
              <h2 className="text-xl font-bold">Selected Music</h2>
              <div className="flex items-center mt-4">
                <img
                  src={selectedItem.thumbnail.url}
                  alt={selectedItem.title}
                  className="w-16 h-16 mr-4"
                />
                <div>
                  <p className="text-lg font-bold">{selectedItem.title}</p>
                  <p className="text-gray-400">{selectedItem.channelTitle}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
