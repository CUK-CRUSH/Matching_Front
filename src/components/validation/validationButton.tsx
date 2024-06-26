import { Button } from '@/components/ui/button';
import { ValidationButtonDTO } from '@/type/validation/validation';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useState } from 'react';

export default function ValidationButton({
  text = '다음',
  navigation,
  buttonEnabled = true,
  onStateChange,
  rounded = true,
  userExists,
}: ValidationButtonDTO) {
  const navigate = useNavigate();
  // const { userData } = useOnboardingStore();
  const [, setCookie] = useCookies(['accessToken']);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (buttonEnabled && !isLoading) {
      setIsLoading(true);

      if (onStateChange) {
        onStateChange();
      } else if (navigation) {
        if (userExists) {
          try {
            setTimeout(async () => {
              // const response: any = await postLogin(
              //   userData.phoneNumber,
              //   userData.verificationCode,
              // );

              // setCookie('accessToken', response.data.accessToken, { path: '/' });
              setCookie(
                'accessToken',
                'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzMCIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJpYXQiOjE3MTk0NzIxODcsImV4cCI6MTcyODExMjE4N30.sYBuQMorZuEB7g17Td257N8Ev1SE4Gpx7ly-NWUiZEg',
                { path: '/' },
              );
              // localStorage.setItem('refreshToken', response.data.refreshToken);
              localStorage.setItem(
                'refreshToken',
                'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzMCIsInR5cGUiOiJyZWZyZXNoX3Rva2VuIiwiaWF0IjoxNzE5NDcyMTg3LCJleHAiOjE3MTk0NzI3ODd9.qS0RD-8XyJPpPeu4b5ZCaeDQPBW12LFj1XBIGfCpMNU',
              );

              navigate('/mypage');
              setIsLoading(false);
            }, 3000); // 3-second delay
          } catch (error) {
            console.error('로그인 실패', error);
            setIsLoading(false);
          }
        } else {
          navigate(navigation);
          setIsLoading(false);
        }
      }
    }
  };

  const buttonCSS =
    buttonEnabled && !isLoading
      ? `w-full h-14 ${rounded ? 'rounded-r-3xl' : ''}`
      : `w-full h-14 bg-[#ececec] text-[#a0a0a0] pointer-events-none ${rounded ? 'rounded-r-3xl' : ''}`;

  return (
    <div className="flex justify-center mb-5 mx-2 w-full">
      <Button variant={'noHover'} onClick={handleClick} className={buttonCSS}>
        {isLoading ? 'Loading...' : text}
      </Button>
    </div>
  );
}
