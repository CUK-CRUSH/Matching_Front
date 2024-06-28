import { Input } from '@/components/ui/input';
import ValidationButton from '@/components/validation/validationButton';
import ValidationPrevButton from '@/components/validation/validationPrevButton';
import ValidationText from '@/components/validation/validationText';
import useOnboardingStore from '@/store/validationStore';
import { useForm } from 'react-hook-form';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '@/utils/ProgressBar';
import { postSignUp } from '@/services/Login/LoginAPI';

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
      comment: userData.comment || '',
    },
  });

  const comment = watch('comment');

  const handleNext = async () => {
    const updatedUserData = {
      ...userData,
      comment: comment,
    };
    setUserData('comment', comment);

    try {
      console.log(updatedUserData);
      await postSignUp(updatedUserData);
      navigate('/login');
    } catch (error) {
      console.log(updatedUserData);
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
              id="comment"
              placeholder="닉네임을 입력해주세요"
              {...register('comment', {
                required: '필수 입력 사항입니다',

                maxLength: {
                  value: 50,
                  message: '최대 50자까지만 입력할 수 있어요',
                },
              })}
            />
            {errors.comment && (
              <p className="text-red-500 text-sm italic mt-1">
                <ExclamationCircleOutlined />
                {errors.comment.message}
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
          buttonEnabled={isValid && comment.length >= 4}
        />
      </div>
    </div>
  );
};

export default OneLinerPage;
