import { Input } from '@/components/ui/input';
import ValidationButton from '@/components/validation/validationButton';
import ValidationPrevButton from '@/components/validation/validationPrevButton';
import ValidationText from '@/components/validation/validationText';
import useOnboardingStore from '@/store/validationStore';
import { useForm } from 'react-hook-form';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '@/utils/ProgressBar';
import axios from 'axios';

const OneLinerPage = () => {
  const navigate = useNavigate();
  const { setCurrentPage, userData, setUserData } = useOnboardingStore();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      oneLiner: userData.oneLiner || '',
    },
  });

  const oneLiner = watch('oneLiner');

  const handleNext = async () => {
    setUserData('oneLiner', oneLiner);
    const formData = new FormData();

    (Object.keys(userData) as (keyof typeof userData)[]).forEach((key) => {
      if (userData[key] === null || userData[key] === undefined) {
        alert(`${key} is missing`);
        throw new Error(`${key} is missing`);
      }
      formData.append(key, userData[key].toString());
    });
    try {
      await axios.post('/v1/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/mypage');
    } catch (error) {
      console.log(formData);
      console.error('Failed to submit data:', error);
      alert('Failed to submit data');
    }
  };
  console.log(userData);
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
              id="oneLiner"
              placeholder="닉네임을 입력해주세요"
              {...register('oneLiner', {
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
            {errors.oneLiner && (
              <p className="text-red-500 text-sm italic mt-1">
                <ExclamationCircleOutlined />
                {errors.oneLiner.message}
              </p>
            )}
          </form>
        </div>
      </div>
      <div className="flex">
        <ValidationPrevButton onStateChange={() => setCurrentPage('birth')} />
        <ValidationButton
          onStateChange={handleNext}
          buttonEnabled={isValid && oneLiner.length >= 4}
        />
      </div>
    </div>
  );
};

export default OneLinerPage;
