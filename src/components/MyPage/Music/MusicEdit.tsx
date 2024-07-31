import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useMyPageStore from '@/store/myPageStore';
import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { LifeMusicItem } from '@/type/services/Music/MusicDTO';

interface MusicFormValues {
  title: string;
  artist: string;
}

const MusicEditPage = () => {
  const {
    setCurrentPage,
    currentMusic,
    selectedMusic,
    setSelectedMusic,
    setUpdateLifeMusics,
    updateLifeMusics,
  } = useMyPageStore();
  const { control, handleSubmit, setValue } = useForm<MusicFormValues>({
    defaultValues: {
      title: '',
      artist: '',
    },
  });

  useEffect(() => {
    if (currentMusic) {
      setValue('title', currentMusic.title);
      setValue('artist', currentMusic.artist);
    }
  }, [currentMusic, setValue]);

  const onSubmit = (data: MusicFormValues) => {
    if (currentMusic) {
      // Update existing music
      const updatedMusic: LifeMusicItem = { ...currentMusic, ...data };
      setUpdateLifeMusics(
        updateLifeMusics.map((music) =>
          music.musicId === currentMusic.musicId ? updatedMusic : music,
        ),
      );
      setSelectedMusic(
        selectedMusic.map((music) =>
          music.musicId === currentMusic.musicId ? updatedMusic : music,
        ),
      );
    } else {
      // Create new music
      const newMusic: LifeMusicItem = { ...data, videoId: 'musicUrl' };
      setSelectedMusic([...selectedMusic, newMusic]);
    }
    setCurrentPage('music');
  };

  return (
    <div className="text-white h-full flex flex-col items-center justify-between">
      <div className="w-full max-w-md mx-auto flex flex-col justify-center flex-grow">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full px-4">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-local_gray_2">제목</label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="제목"
                  className="bg-black text-white border-none w-full"
                />
              )}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-local_gray_2">아티스트</label>
            <Controller
              name="artist"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="아티스트"
                  className="bg-black text-white border-none w-full"
                />
              )}
            />
          </div>
        </form>
      </div>
      <div className="w-full flex items-center justify-center px-4 mb-8">
        <Button
          type="submit"
          className="w-auto rounded-2xl text-l p-10 py-5 bg-black text-white"
          variant={'noHover'}
          onClick={handleSubmit(onSubmit)}
        >
          완료
        </Button>
      </div>
    </div>
  );
};

export default MusicEditPage;
