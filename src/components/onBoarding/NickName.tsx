import { Input } from '@/components/ui/input';
import ValidationButton from '@/components/validation/validationButton';
import ValidationPrevButton from '@/components/validation/validationPrevButton';
import ValidationText from '@/components/validation/validationText';
import useOnboardingStore from '@/store/validationStore';
import { useForm } from 'react-hook-form';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ProgressBar from '@/utils/ProgressBar';

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
      name: userData.name || '',
    },
  });

  const name = watch('name');

  const handleNext = () => {
    setUserData('name', name);
    setCurrentPage('birth');
  };
  console.log(userData);
  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="absolute w-full mt-2">
        <ProgressBar currentPage={6} totalPages={8} />
      </div>
      <div>
        <ValidationText
          titleTexts={['닉네임 입력']}
          descriptionTexts={['DUETT에서 사용할 별칭을 입력해주세요']}
        />

        <div className="mt-16 mx-4">
          <form onSubmit={handleSubmit(() => setCurrentPage('birth'))}>
            <Input
              type="text"
              id="name"
              placeholder="닉네임을 입력해주세요"
              {...register('name', {
                required: '닉네임은 필수 입력 사항입니다',
                minLength: {
                  value: 4,
                  message: '3자 이상 입력해주세요',
                },
                maxLength: {
                  value: 15,
                  message: '최대 15자까지만 입력할 수 있어요',
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm italic mt-1">
                <ExclamationCircleOutlined />
                {errors.name.message}
              </p>
            )}
          </form>
        </div>
      </div>
      <div className="flex">
        <ValidationPrevButton onStateChange={() => setCurrentPage('location')} />
        <ValidationButton onStateChange={handleNext} buttonEnabled={isValid && name.length >= 4} />
      </div>
    </div>
  );
};

export default NickNamePage;
