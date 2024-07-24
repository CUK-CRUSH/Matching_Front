'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuthenticationCode, getExistMember } from '@/services/Login/LoginAPI';
import useOnboardingStore from '@/store/validationStore';

const FormSchema = z.object({
  pin: z
    .string()
    .min(11, {
      message: '글자를 전부 채워야합니다.',
    })
    .refine((pin) => pin.startsWith('010'), {
      message: '"010"으로 시작해야합니다.',
    })
    .refine(
      (pin) => {
        // 확인: "010" 다음에 오는 문자들이 정확히 8개이며 모두 숫자인지 검사
        return pin.length === 11 && /^\d+$/.test(pin.slice(3));
      },
      {
        message: 'The PIN must consist of "010" followed by 8 numeric characters.',
      },
    ),
});

export const InputForm = () => {
  const { setUserData, setUserExist, isSubmitted, setIsSubmitted } = useOnboardingStore();
  const methods = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    defaultValues: {
      pin: '',
    },
  });

  const { formState, handleSubmit, control } = methods;
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const authenticationCode = await getAuthenticationCode(data.pin);

      if (authenticationCode.data.code) {
        setUserData('phoneNumber', data.pin);
        setUserData('verificationCode', authenticationCode.data.code);

        const memberStatus = await getExistMember(data.pin);
        setUserExist(memberStatus.data.exists);

        // 핸드폰 기종에 따라 분기
        const userAgent = navigator.userAgent.toLowerCase();
        let bodyPrefix = '?body=';

        if (
          userAgent.indexOf('iphone') > -1 ||
          userAgent.indexOf('ipad') > -1 ||
          userAgent.indexOf('ipod') > -1
        ) {
          bodyPrefix = '&body=';
        }

        const smsUrl = `sms:${import.meta.env.VITE_DUETT_EMAIL}${bodyPrefix}${encodeURIComponent(authenticationCode?.data?.code)}`;
        window.location.href = smsUrl;

        toast.success('인증 메시지가 전송되었습니다.');

        setIsSubmitted(true);
      } else {
        throw new Error('reponse가 없나?');
      }
    } catch (error) {
      console.error(error);
      toast.error(
        `인증 에러: ${(error as Error).message}. 인증 메시지 전송에 실패했습니다. 다시 시도해주세요.`,
      );
    }
  };

  return (
    <div className="w-full ">
      <Form {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="mx-2 mb-3 space-y-6">
          <FormField
            control={control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP maxLength={11} {...field}>
                    <InputOTPGroup className="w-1/3">
                      <InputOTPSlot className="bg-[#F2F2F2] mr-[0.1rem]" index={0} />
                      <InputOTPSlot className="bg-[#F2F2F2] mr-[0.1rem]" index={1} />
                      <InputOTPSlot className="bg-[#F2F2F2]" index={2} />
                    </InputOTPGroup>
                    <InputOTPGroup className="w-1/3">
                      <InputOTPSlot className="bg-[#F2F2F2] mr-[0.1rem]" index={3} />
                      <InputOTPSlot className="bg-[#F2F2F2] mr-[0.1rem]" index={4} />
                      <InputOTPSlot className="bg-[#F2F2F2] mr-[0.1rem]" index={5} />
                      <InputOTPSlot className="bg-[#F2F2F2]" index={6} />
                    </InputOTPGroup>
                    <InputOTPGroup className="w-1/3">
                      <InputOTPSlot className="bg-[#F2F2F2] mr-[0.1rem]" index={7} />
                      <InputOTPSlot className="bg-[#F2F2F2] mr-[0.1rem]" index={8} />
                      <InputOTPSlot className="bg-[#F2F2F2] mr-[0.1rem]" index={9} />
                      <InputOTPSlot className="bg-[#F2F2F2]" index={10} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{' '}
          <div className="flex justify-center">
            <Button
              type="submit"
              className={`w-1/3 h-12 ${isSubmitted ? 'bg-[#a0a0a0] text-white pointer-events-none' : formState.isValid ? 'bg-[#252525] text-white' : 'bg-[#a0a0a0] text-white pointer-events-none'}`}
            >
              {isSubmitted ? '메시지 인증 완료' : '인증 메시지 전송'}
            </Button>
          </div>
          <p className="whitespace-pre-line">
            {isSubmitted ? "하단의 '다음'을 누르면 \n 다음단계로 이동합니다." : ''}
          </p>
        </form>
      </Form>
    </div>
  );
};
