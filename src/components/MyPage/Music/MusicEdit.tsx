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
      const newMusic: LifeMusicItem = { ...data, url: 'musicUrl' }; // Add the URL or other necessary fields
      setSelectedMusic([...selectedMusic, newMusic]);
    }
    setCurrentPage('music'); // Navigate back to the music list page
  };

  return (
    <div className="text-white h-full flex flex-col items-center">
      <div className="w-full max-w-md mx-auto flex flex-col h-full ">
        <h2 className="text-lg font-bold">{currentMusic ? 'Edit Music' : 'Add New Music'}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Title" className="bg-black text-white w-full" />
            )}
          />
          <Controller
            name="artist"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Artist" className="bg-black text-white w-full" />
            )}
          />
          <Button type="submit" className="w-full bg-white text-black mt-4">
            {currentMusic ? 'Save Changes' : 'Add Music'}
          </Button>
        </form>
        <Button
          onClick={() => setCurrentPage('music')}
          className="w-full bg-gray-500 text-white mt-4"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default MusicEditPage;
