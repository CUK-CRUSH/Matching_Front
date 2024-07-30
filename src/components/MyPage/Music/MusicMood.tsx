import useMyPageStore from '@/store/myPageStore';
import MatchingListHeader from '../../layout/matchingListHeader';
import { useForm, Controller } from 'react-hook-form';
import { useImageCrop } from '@/hooks/useImageCrop';
import { Dialog, DialogActions, DialogContent, DialogTitle, Slider } from '@mui/material';
import Cropper from 'react-easy-crop';
import { Button } from '@/components/ui/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMusicTasteData, postUserMoodData } from '@/services/Music/MusicAPI';
import { MoodDataDTO, MusicTasteDataDTO } from '@/type/services/Music/MusicDTO';
import UseAccessToken from '@/hooks/useAccessToken';

const MusicMoodPage = () => {
  const { setCurrentPage } = useMyPageStore();

  const accessToken = UseAccessToken();

  const queryClient = useQueryClient();

  const { data: musicTasteData } = useQuery<MusicTasteDataDTO>({
    queryKey: ['musicTasteData'],
    queryFn: () => getMusicTasteData(accessToken),
    staleTime: 1000 * 60 * 5,
  });

  const mutation = useMutation({
    mutationFn: (updatedData: MoodDataDTO) => postUserMoodData(accessToken, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['musicTasteData'] });
      setCurrentPage('music');
    },
  });

  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: musicTasteData?.mood?.title || '',
      artist: musicTasteData?.mood?.artist || '',
    },
  });

  const {
    imageSrc,
    compressedImage,
    crop,
    zoom,
    open,
    setCrop,
    setZoom,
    setOpen,
    handleImageChange,
    handleCropComplete,
    setCroppedArea,
    croppedArea,
  } = useImageCrop(musicTasteData?.mood?.moodImageUrl || null, true);

  const onSubmit = (data: { title: string; artist: string }) => {
    const updatedData: MoodDataDTO = {
      title: data.title,
      artist: data.artist,
      moodImage: compressedImage ?? undefined,
      // isDeleteImage: !compressedImage,
    };

    mutation.mutate(updatedData);
    console.log(updatedData);
  };

  const handleImageUploadClick = () => {
    document.getElementById('fileInput')?.click();
  };

  return (
    <div className="text-white h-full flex flex-col items-center pb-20">
      <div className="w-full max-w-md mx-auto mt-5">
        <MatchingListHeader
          onStateChange={() => setCurrentPage('music')}
          mypageText="My Page | 프로필 수정"
        />

        <div className="relative mx-4">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            <div>
              <label className="block mb-1 text-sm">연인과 듣고 싶은 곡</label>
              <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="곡 명을 입력해주세요"
                    className="w-full p-2 bg-gray-700 rounded"
                  />
                )}
              />
            </div>

            <Controller
              name="artist"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  placeholder="아티스트명을 입력해주세요"
                  className="w-full p-2 bg-gray-700 rounded"
                />
              )}
            />

            <div>
              <label className="block mb-1 text-sm">선정한 음악을 들으면 떠오르는 이미지</label>
              <label className="block mb-1 text-sm">혹은 잘 어울리는 이미지를 선택해주세요</label>
              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={(e) => {
                  handleImageChange(e);
                }}
              />
              <button
                type="button"
                className="w-full bg-gray-700 rounded flex items-center justify-center h-24"
                onClick={handleImageUploadClick}
              >
                {compressedImage ? (
                  <img
                    src={compressedImage}
                    alt="Selected"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <>
                    <img src="path/to/your/upload/icon" alt="Upload" className="h-8 w-8" />
                    <span>이미지 추가하기</span>
                  </>
                )}
              </button>
            </div>
            <button
              type="submit"
              className="mt-5 p-3 w-full bg-blue-500 text-white rounded disabled:bg-gray-500"
            >
              완료
            </button>
          </form>
        </div>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth fullScreen>
        <DialogTitle>이미지 크롭</DialogTitle>
        <DialogContent>
          <div className="relative w-full h-full">
            <Cropper
              image={imageSrc ?? undefined}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={(_, croppedAreaPixels) => setCroppedArea(croppedAreaPixels)}
              onZoomChange={setZoom}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <div className="flex flex-col w-full">
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(_, zoom) => setZoom(zoom as number)}
            />
            <Button onClick={() => handleCropComplete(croppedArea)}>확인</Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MusicMoodPage;
