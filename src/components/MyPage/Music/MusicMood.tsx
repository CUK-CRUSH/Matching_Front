import useMyPageStore from '@/store/myPageStore';
import MatchingListHeader from '../../layout/matchingListHeader';
import { useForm, Controller } from 'react-hook-form';
import { useImageCrop } from '@/hooks/useImageCrop';
import Cropper from 'react-easy-crop';
import { Button } from '@/components/ui/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMusicTasteData, postUserMoodData } from '@/services/Music/MusicAPI';
import { MoodDataDTO, MusicTasteDataDTO } from '@/type/services/Music/MusicDTO';
import UseAccessToken from '@/hooks/useAccessToken';
import ImageIcon from '@/assets/Icon/ImageIcon.svg';

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
      title: data.title || null,
      artist: data.artist || null,
      moodImage: compressedImage ?? undefined, // if no image, send null
      isDeleteImage: !compressedImage, // if no image, set isDeleteImage to true
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
          background="#252525"
        />

        <div className="relative mx-4">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            <div>
              <label className="block mb-2 text-l text-local_gray_2">연인과 듣고 싶은 곡</label>
              <div className="space-y-2 mx-2">
                <Controller
                  name="title"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="곡 명을 입력해주세요"
                      className="w-full p-3 bg-black border-none text-m rounded-lg"
                    />
                  )}
                />

                <Controller
                  name="artist"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="아티스트명을 입력해주세요"
                      className="w-full p-3 bg-black border-none text-m rounded-lg"
                    />
                  )}
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-l text-local_gray_2 whitespace-pre-line">
                선정한 음악을 들으면 떠오르는 이미지 <br /> 혹은 잘 어울리는 이미지를 선택해주세요
              </label>

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
                className="w-full bg-local_black_bright rounded-xl flex items-center justify-center h-24"
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
                    <img src={ImageIcon} alt="Upload" className="h-8 w-8" />
                  </>
                )}
              </button>
            </div>

            <div className="w-full flex items-center justify-center px-4 mb-8">
              <Button
                type="submit"
                className="w-auto rounded-2xl text-l p-10 py-5 bg-black text-white"
                variant={'noHover'}
              >
                완료
              </Button>
            </div>
          </form>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
          <div className="flex flex-row justify-between p-4 w-full max-w-[430px]">
            <Button onClick={() => setOpen(false)} className="text-red-500 bg-transparent">
              취소
            </Button>
            <Button
              onClick={() => handleCropComplete(croppedArea)}
              className="text-white bg-transparent"
            >
              저장
            </Button>
          </div>
          <div className="relative flex-grow w-full max-w-[430px] h-full">
            <Cropper
              image={imageSrc ?? undefined}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={(_, croppedAreaPixels) => setCroppedArea(croppedAreaPixels)}
              onZoomChange={setZoom}
              style={{
                containerStyle: { height: '100%', width: '100%' },
                cropAreaStyle: { border: '2px solid white' },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicMoodPage;
