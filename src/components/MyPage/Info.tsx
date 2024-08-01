import { getUserInfoData, patchUserInfoData } from '@/services/Mypage/MypageAPI';
import useMyPageStore from '@/store/myPageStore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useImageCrop } from '@/hooks/useImageCrop';
import Cropper from 'react-easy-crop';
import MatchingListHeader from '../layout/matchingListHeader';
import { ProfilesInfoDTO, UserInfoDTO } from '@/type/services/Mypage/MypageDTO';
import { useEffect } from 'react';
import UseAccessToken from '@/hooks/useAccessToken';
import CameraIcon from '@/assets/Icon/CameraIcon.svg';

const formSchema = z.object({
  nickname: z
    .string()
    .min(2, {
      message: '3자 이상 입력해주세요',
    })
    .max(15, { message: '최대 15자 까지만 입력할 수 있어요' }),
  oneLiner: z.string().max(50, {
    message: '최대 50자 까지 입력할 수 있어요',
  }),
});

const InfoPage = () => {
  const { setCurrentPage } = useMyPageStore();

  const accessToken = UseAccessToken();

  const queryClient = useQueryClient();

  const { data: InfoData, error } = useQuery<ProfilesInfoDTO>({
    queryKey: ['InfoData'],
    queryFn: () => getUserInfoData(accessToken),
    staleTime: 1000 * 60 * 5,
  });

  const mutation = useMutation({
    mutationFn: (updatedData: UserInfoDTO) => patchUserInfoData(accessToken, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['InfoData'] });
      queryClient.invalidateQueries({ queryKey: ['mainData'] });
      setCurrentPage('mypage');
    },
  });

  const initialNickname = InfoData?.data.name || '';
  const initialOneLiner = InfoData?.data.oneLineIntroduction || '';

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: initialNickname,
      oneLiner: initialOneLiner,
    },
  });

  const {
    formState: { errors },
  } = form;

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const updatedName = data.nickname === initialNickname ? null : data.nickname;
    const updatedOneLiner = data.oneLiner === initialOneLiner ? null : data.oneLiner;

    mutation.mutate({
      profileImage: compressedImage ?? undefined,
      name: updatedName,
      oneLineIntroduction: updatedOneLiner,
      isDeleteImage: true,
    });
  };

  const filledFieldsCount =
    (form.watch('nickname').length >= 3 && form.watch('nickname').length <= 15 ? 1 : 0) +
    (form.watch('oneLiner').length <= 50 && form.watch('oneLiner').length > 0 ? 1 : 0);

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
  } = useImageCrop(InfoData?.data.profileImageUrl || null, true);

  useEffect(() => {
    if (InfoData) {
      form.reset({
        nickname: initialNickname,
        oneLiner: initialOneLiner,
      });
    }
  }, [InfoData, form]);

  if (error) {
    return <div>Error loading user data</div>;
  }
  if (!InfoData) {
    return <div>No user data found</div>;
  }

  return (
    <div className="text-white h-full flex flex-col items-center">
      <div className="w-full max-w-md mx-auto flex flex-col h-full ">
        <MatchingListHeader
          text="내 정보 설정"
          onStateChange={() => setCurrentPage('mypage')}
          mypageText="My Page | 프로필 수정"
          background="#252525"
        />
        <div className="flex flex-col h-full">
          <div className="flex flex-col items-center mt-4">
            <Avatar className="w-32 h-32 rounded-lg relative">
              <AvatarImage src={compressedImage ?? InfoData.data.profileImageUrl ?? undefined} />
              <AvatarFallback>CN</AvatarFallback>

              <div className="absolute z-40 bottom-0 right-0 bg-white rounded-full p-2 flex items-center justify-center cursor-pointer">
                <img src={CameraIcon} alt="camera" className="z-10" />
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  style={{ zIndex: 20 }}
                />
              </div>
            </Avatar>
          </div>
          <div className="flex flex-col items-center mt-4 w-full px-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                <FormField
                  control={form.control}
                  name="nickname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>닉네임</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-black border-none"
                          placeholder="닉네임을 입력해주세요"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col w-full items-start space-y-4">
                  <div className="flex flex-col space-y-1">
                    <span>생년월일</span>
                    <Button
                      disabled
                      className="w-auto inline-flex bg-transparent border-[0.1rem] items-center justify-center cursor-not-allowed"
                    >
                      {InfoData?.data.birthDate || '생년월일'}
                    </Button>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span>성별</span>
                    <Button
                      disabled
                      className="w-auto inline-flex bg-transparent border-[0.1rem] items-center justify-center cursor-not-allowed"
                    >
                      {InfoData?.data.gender || '성별'}
                    </Button>
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="oneLiner"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>한줄소개</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-black border-none"
                          placeholder="한줄소개를 입력해주세요"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>최대 50자 까지 입력할 수 있어요</FormDescription>
                      <FormMessage />
                      {fieldState.error && (
                        <span className="text-red-500">
                          {fieldState.error.type === 'minLength'
                            ? '최소 50자 이상 입력해주세요'
                            : '최대 50자 까지 입력할 수 있어요'}
                        </span>
                      )}
                    </FormItem>
                  )}
                />
                <div className="absolute bottom-9 w-full px-4 right-0">
                  <div className="flex flex-col justify-center w-full mt-4">
                    <p className="text-center">{filledFieldsCount}/2 완료</p>

                    <Button
                      type="submit"
                      variant={'noHover'}
                      className={`w-full bg-white text-l text-black mt-4 max-w-md rounded-3xl mx-auto ${Object.keys(errors).length ? 'cursor-not-allowed opacity-50' : ''}`}
                      disabled={Object.keys(errors).length > 0}
                    >
                      저장하기
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black">
          <div className="flex flex-row justify-between p-4 w-full max-w-[430px]">
            <Button onClick={() => setOpen(false)} className="text-red-500">
              취소
            </Button>
            <Button onClick={() => handleCropComplete(croppedArea)} className="text-green-500">
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

export default InfoPage;
