import { Input } from '@/components/ui/input';
import ValidationButton from '@/components/validation/validationButton';
import ValidationPrevButton from '@/components/validation/validationPrevButton';
import ValidationText from '@/components/validation/validationText';
import useOnboardingStore from '@/store/validationStore';
import { useForm } from 'react-hook-form';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ProgressBar from '@/utils/ProgressBar';
import { postSignUp } from '@/services/Login/LoginAPI';
import { useState } from 'react';
import Spinner from '@/utils/Spinner';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

const OneLinerPage = () => {
  const { setCurrentPage, userData, setUserData } = useOnboardingStore();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      oneLineIntroduction: userData.oneLineIntroduction || '',
    },
  });

  const oneLineIntroduction = watch('oneLineIntroduction');
  const [loading, setLoading] = useState(false);

  const [, setCookie] = useCookies(['accessToken']);
  const navigate = useNavigate();

  const handleNext = async () => {
    const updatedUserData = {
      ...userData,
      oneLineIntroduction: oneLineIntroduction,
    };
    setUserData('oneLineIntroduction', oneLineIntroduction);

    // UpdatedUserData를 콘솔에 출력하여 확인
    console.log('Updated User Data:', updatedUserData);

    setLoading(true);
    setTimeout(async () => {
      try {
        const response: any = await postSignUp(updatedUserData);

        setCookie('accessToken', response.data.token.accessToken, { path: '/' });
        localStorage.setItem('refreshToken', response.data.token.refreshToken);
        window.location.href = '/mypage';
      } catch (error: any) {
        console.error('로그인 실패', error);
        toast.error('로그인 실패: ' + error.message);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    }, 3000);
  };

  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="absolute w-full mt-2">
        <ProgressBar currentPage={8} totalPages={8} />
      </div>
      <div>
        <ValidationText
          titleTexts={['한줄소개']}
          descriptionTexts={['한줄소개글을 작성해주세요']}
        />

        <div className="mt-16 mx-4">
          <form onSubmit={handleSubmit(handleNext)}>
            <Input
              type="text"
              id="oneLineIntroduction"
              placeholder="한줄소개를 입력해주세요"
              {...register('oneLineIntroduction', {
                required: '필수 입력 사항입니다',

                maxLength: {
                  value: 50,
                  message: '최대 50자까지만 입력할 수 있어요',
                },
              })}
            />
            {errors.oneLineIntroduction && (
              <p className="text-red-500 text-sm italic mt-1">
                <ExclamationCircleOutlined />
                {errors.oneLineIntroduction.message}
              </p>
            )}
          </form>
        </div>
      </div>
      <div className="flex">
        <ValidationPrevButton onStateChange={() => setCurrentPage('birth')} />
        <ValidationButton
          text="완료"
          onStateChange={handleNext}
          buttonEnabled={isValid && oneLineIntroduction.length >= 4}
        />
      </div>{' '}
      {loading && <Spinner />}
    </div>
  );
};

export default OneLinerPage;
