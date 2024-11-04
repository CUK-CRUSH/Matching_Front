import ValidationButton from '@/components/validation/validationButton';
import ValidationPrevButton from '@/components/validation/validationPrevButton';
import ValidationText from '@/components/validation/validationText';
import useOnboardingStore from '@/store/validationStore';
import ProgressBar from '@/utils/ProgressBar';
import { InputForm } from '@/utils/form';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import LoginConfirm from '@/assets/loginConfirm.svg';

const LoginPage = () => {
  const { userExist, isSubmitted } = useOnboardingStore();

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
        <div className="text-gray-400 text-sm flex items-center justify-center">
          <ExclamationCircleOutlined className="mr-1" />
          <div>
            <p>'인증메시지 전송'을 누르고,</p>
            <p>미리 작성되어있는 인증메시지를 전송해주세요.</p>
          </div>
        </div>
        <img src={LoginConfirm} alt="loginConfirm" className="w-full h-64 mt-4" />
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
