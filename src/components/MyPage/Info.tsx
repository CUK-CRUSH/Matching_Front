import { getUserData } from '@/services/Mypage/MypageAPI';
import useMyPageStore from '@/store/myPageStore';
import { Product } from '@/type/product';
import { LeftOutlined } from '@ant-design/icons';
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
import { useQuery } from '@tanstack/react-query';
import { useImageCrop } from '@/hooks/useImageCrop';
import { Dialog, DialogActions, DialogContent, DialogTitle, Slider } from '@mui/material';
import Cropper from 'react-easy-crop';
import axios from 'axios';

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
  const { data: userData, error } = useQuery<Product>({
    queryKey: ['userData'],
    queryFn: getUserData,
    staleTime: 1000 * 60 * 5,
    placeholderData: (previousData) => previousData,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: userData?.data.nickname || '',
      oneLiner: userData?.data.oneLiner || '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append('profileImage', compressedImage || userData?.data.profileImage || '');
      formData.append('nickname', data.nickname);
      formData.append('oneLiner', data.oneLiner);

      await axios.post(`/v1/user`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setCurrentPage('mypage');
      alert('수정 완료');
    } catch (e) {
      console.error(e);
      alert('실패');
    }
  };
  const filledFieldsCount =
    (userData?.data.profileImage ? 1 : 0) +
    (form.watch('nickname').length >= 3 && form.watch('nickname').length <= 15 ? 1 : 0) +
    (userData?.data.birthDate ? 1 : 0) +
    (userData?.data.sex ? 1 : 0) +
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
  } = useImageCrop(userData?.data.profileImage || null, true);
  console.log(userData);
  if (error) {
    return <div>error</div>;
  }
  if (!userData) {
    return <div>No user data found</div>; // userData가 없을 때 처리
  }
  return (
    <div className="bg-[#1c1c1c] text-white h-full flex flex-col items-center">
      <div className="w-full max-w-md mx-auto flex flex-col h-full ">
        <div className="flex flex-row  items-center w-full p-4 space-x-1">
          <button onClick={() => setCurrentPage('mypage')}>
            <LeftOutlined />
          </button>
          <h1 className="text-2xl font-bold">내 정보 설정</h1>
        </div>
        <div className="flex flex-col h-full">
          <div className="flex flex-col items-center mt-4">
            <Avatar className="w-32 h-32 rounded-lg relative">
              <AvatarImage src={compressedImage ?? userData.data.profileImage ?? undefined} />
              <AvatarFallback>CN</AvatarFallback>
              <input
                type="file"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
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
                          className="bg-black"
                          placeholder="닉네임을 입력해주세요"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col w-full items-start space-y-4">
                  <Button
                    disabled
                    className="w-auto inline-flex items-center justify-center bg-gray-600 cursor-not-allowed"
                  >
                    {userData?.data.birthDate || '생년월일'}
                  </Button>
                  <Button
                    disabled
                    className="w-auto inline-flex items-center justify-center bg-gray-600 cursor-not-allowed"
                  >
                    {userData?.data.sex || '성별'}
                  </Button>
                </div>
                <FormField
                  control={form.control}
                  name="oneLiner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>한줄소개</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-black"
                          placeholder="한줄소개를 입력해주세요"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>최대 30자 까지 입력할 수 있어요</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="absolute bottom-9 w-full px-4 right-0">
                  <div className="flex flex-col justify-center w-full mt-4">
                    <p className="text-center">{filledFieldsCount}/5 완료</p>

                    <Button
                      type="submit"
                      disabled={filledFieldsCount !== 5}
                      variant={'noHover'}
                      className={`w-full bg-white text-l text-black mt-4 max-w-md rounded-lg mx-auto ${filledFieldsCount !== 5 && 'cursor-not-allowed'}`}
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

export default InfoPage;
