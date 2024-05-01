import Layout from '@/components/layout/layout';
import { Button } from '@/components/ui/button';
import { InputForm } from '@/utils/form';

const LoginPage = () => {
  return (
    <Layout>
      <div className="flex flex-col scrollbar-hide overflow-scroll justify-between h-screen">
        <div>
          <div className="ml-4 mt-32 mb-28">
            <p className="text-2xl font-semibold mb-2 text-[#2f2f2f]">전화번호 로그인</p>
            <p className="text-base font-medium  text-[#2f2f2f]">입력한 전화번호로</p>
            <p className="text-base font-medium  text-[#2f2f2f]">인증번호가 전송됩니다.</p>
          </div>
          <InputForm />
        </div>
        <div className="flex justify-center mb-5 mx-2">
          <Button className="w-full h-12">다음</Button>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
