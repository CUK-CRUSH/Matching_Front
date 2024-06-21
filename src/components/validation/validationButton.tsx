import { Button } from '@/components/ui/button';
import { postLogin } from '@/services/Login/LoginAPI';
import useOnboardingStore from '@/store/validationStore';
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
  const { userData } = useOnboardingStore();
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
            const response: any = await postLogin(userData.phoneNumber, userData.verificationCode);

            setCookie('accessToken', response.data.accessToken, { path: '/' });
            localStorage.setItem('refreshToken', response.data.refreshToken);

            navigate('/mypage');
          } catch (error) {
            console.error('로그인 실패', error);
            setIsLoading(false);
          }
        } else {
          navigate(navigation);
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
