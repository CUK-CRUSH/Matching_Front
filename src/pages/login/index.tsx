import ValidationButton from '@/components/validation/validationButton';
import ValidationPrevButton from '@/components/validation/validationPrevButton';
import ValidationText from '@/components/validation/validationText';
import { InputForm } from '@/utils/form';

const LoginPage = () => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <div>
        <ValidationText
          titleTexts={['전화번호 로그인']}
          descriptionTexts={['입력한 전화번호로', '인증번호가 전송됩니다.']}
        />
        <div className="mt-16 mx-4">
          <InputForm />
        </div>
      </div>
      <div className="flex">
        <ValidationPrevButton navigation="/" />
        <ValidationButton navigation="/onboarding" />
      </div>
    </div>
  );
};

export default LoginPage;
