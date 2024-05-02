import ValidationButton from '@/components/validation/validationButton';
import ValidationText from '@/components/validation/validationText';
import { InputForm } from '@/utils/form';

const LoginPage = () => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <ValidationText
        titleTexts={['전화번호 로그인']}
        descriptionTexts={['입력한 전화번호로', '인증번호가 전송됩니다.']}
      />

      <InputForm />

      <ValidationButton navigation="/" />
    </div>
  );
};

export default LoginPage;
