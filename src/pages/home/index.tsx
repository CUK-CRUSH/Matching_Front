import Logo from '@/assets/Home/Logo.svg';
import ValidationButton from '@/components/validation/validationButton';

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="flex-1 flex items-center justify-center">
        <img src={Logo} alt="logo" className="self-center" />
      </div>
      <div className="flex">
        <ValidationButton rounded={false} navigation="/terms" text="시작하기" />
      </div>
    </div>
  );
}
