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

const formSchema = z.object({
  nickname: z
    .string()
    .min(2, {
      message: '3자 이상 입력해주세요',
    })
    .max(15, { message: '최대 15자 까지만 입력할 수 있어요' }),
  oneLiner: z.string().max(30, {
    message: '최대 30자 까지 입력할 수 있어요',
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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  if (error) {
    return <div>error</div>;
  }
  if (!userData) {
    return <div>No user data found</div>; // userData가 없을 때 처리
  }
  return (
    <div className="bg-[#1c1c1c] text-white h-full flex flex-col items-center pb-20">
      <div className="w-full max-w-md mx-auto">
        <div className="flex flex-row items-center w-full p-4 space-x-1">
          <button onClick={() => setCurrentPage('mypage')}>
            <LeftOutlined />
          </button>
          <h1 className="text-2xl font-bold">내 정보 설정</h1>
        </div>
        <div className="flex flex-col items-center mt-4">
          <Avatar className="w-32 h-32 rounded-lg relative">
            <AvatarImage src={userData.data.profileImage ?? undefined} />
            <AvatarFallback>CN</AvatarFallback>
            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
          </Avatar>
        </div>
        <div className="flex flex-col items-center mt-4 w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full px-4">
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>닉네임</FormLabel>
                    <FormControl>
                      <Input className="bg-black" placeholder="닉네임을 입력해주세요" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <Button type="submit" className="w-full mt-4">
                저장하기
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
