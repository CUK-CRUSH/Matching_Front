import ValidationButton from '@/components/validationButton/validationButton';
import { InputForm } from '@/utils/form';

const LoginPage = () => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <div>
        <div className="ml-4 mt-32 mb-28">
          <p className="text-2xl font-semibold mb-2 text-[#2f2f2f]">전화번호 로그인</p>
          <p className="text-base font-medium  text-[#2f2f2f]">입력한 전화번호로</p>
          <p className="text-base font-medium  text-[#2f2f2f]">인증번호가 전송됩니다.</p>
        </div>
        <InputForm />
      </div>
      <ValidationButton />
    </div>
  );
};

export default LoginPage;
