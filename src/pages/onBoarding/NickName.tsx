import { Input } from '@/components/ui/input';
import ValidationButton from '@/components/validation/validationButton';
import ValidationPrevButton from '@/components/validation/validationPrevButton';
import ValidationText from '@/components/validation/validationText';
import useOnboardingStore from '@/store/validationStore';
import { useForm } from 'react-hook-form';

const NickNamePage = () => {
  const { setCurrentPage, userData, setUserData } = useOnboardingStore();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      nickname: userData.nickname || '',
    },
  });

  const nickname = watch('nickname');

  const handleNext = () => {
    setUserData('nickname', nickname);
    setCurrentPage('birth');
  };
  console.log(userData);
  return (
    <div className="flex flex-col justify-between h-screen">
      <div>
        <ValidationText
          titleTexts={['닉네임 입력']}
          descriptionTexts={['DUETT에서 사용할 별칭을 입력해주세요']}
        />
        <div className="flex justify-start items-center relative gap-1 mx-4 mt-2">
          <svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-grow-0 flex-shrink-0 w-3 h-3 relative"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M5.9718 0C2.679 0 0 2.6916 0 6C0 9.3084 2.6916 12 6 12C9.3084 12 12 9.3084 12 6C12 2.6916 9.2958 0 5.9718 0ZM6 10.8C3.3534 10.8 1.2 8.6466 1.2 6C1.2 3.3534 3.3402 1.2 5.9718 1.2C8.6346 1.2 10.8 3.3534 10.8 6C10.8 8.6466 8.6466 10.8 6 10.8Z"
              fill="#FF8787"
            />
            <path
              d="M5.40039 3.6C5.40039 3.26863 5.66902 3 6.00039 3C6.33176 3 6.60039 3.26863 6.60039 3.6V6.6C6.60039 6.93137 6.33176 7.2 6.00039 7.2C5.66902 7.2 5.40039 6.93137 5.40039 6.6V3.6ZM5.40039 8.4C5.40039 8.06863 5.66902 7.8 6.00039 7.8C6.33176 7.8 6.60039 8.06863 6.60039 8.4C6.60039 8.73137 6.33176 9 6.00039 9C5.66902 9 5.40039 8.73137 5.40039 8.4Z"
              fill="#FF8787"
            />
          </svg>
          <p className="flex-grow-0 flex-shrink-0 text-[10px] font-medium text-left text-[#ff8787]">
            <span className="flex-grow-0 flex-shrink-0 text-[10px] font-medium text-left text-[#ff8787]">
              모두가 쾌적하게 이용할 수 있도록
            </span>
            <br />
            <span className="flex-grow-0 flex-shrink-0 text-[10px] font-medium text-left text-[#ff8787]">
              타인에게 불편함을 주는 별칭은 자제...
            </span>
          </p>
        </div>

        <div className="mt-16 mx-4">
          <form onSubmit={handleSubmit(() => setCurrentPage('birth'))}>
            <Input
              type="text"
              id="nickname"
              placeholder="닉네임을 입력해주세요"
              {...register('nickname', {
                required: '닉네임은 필수 입력 사항입니다',
                minLength: {
                  value: 4,
                  message: '닉네임은 최소 4글자 이상이어야 합니다',
                },
              })}
            />
            {errors.nickname && (
              <p className="text-red-500 text-xs italic">{errors.nickname.message}</p>
            )}
          </form>
        </div>
      </div>
      <div className="flex">
        <ValidationPrevButton onStateChange={() => setCurrentPage('location')} />
        <ValidationButton
          onStateChange={handleNext}
          buttonEnabled={isValid && nickname.length >= 4}
        />
      </div>
    </div>
  );
};

export default NickNamePage;
