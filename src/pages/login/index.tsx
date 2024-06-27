import ValidationButton from '@/components/validation/validationButton';
import ValidationPrevButton from '@/components/validation/validationPrevButton';
import ValidationText from '@/components/validation/validationText';
import useOnboardingStore from '@/store/validationStore';
import ProgressBar from '@/utils/ProgressBar';
import { InputForm } from '@/utils/form';

const LoginPage = () => {
  const { userExist, isSubmitted } = useOnboardingStore();
  console.log(userExist);
  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="absolute w-full mt-2">
        <ProgressBar currentPage={1} totalPages={8} />
      </div>
      <div>
        <ValidationText
          titleTexts={['전화번호 로그인']}
          descriptionTexts={['입력한 전화번호로', '본인 인증 메시지가 전송됩니다.']}
        />
        <div className="mt-16 mx-4">
          <InputForm />
        </div>
      </div>
      <div className="flex">
        <ValidationPrevButton navigation="/" />
        <ValidationButton
          navigation="/onboarding"
          userExists={userExist}
          buttonEnabled={isSubmitted}
        />
      </div>
    </div>
  );
};

export default LoginPage;
