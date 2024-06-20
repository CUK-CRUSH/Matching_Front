import { Button } from '@/components/ui/button';
import { ValidationButtonDTO } from '@/type/validation/validation';
import { useNavigate } from 'react-router-dom';

export default function ValidationButton({
  text = '다음',
  navigation,
  buttonEnabled = true,
  onStateChange,
  rounded = true,
  userExists,
}: ValidationButtonDTO) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (buttonEnabled) {
      if (onStateChange) {
        onStateChange();
      } else if (navigation) {
        const nextPage = userExists ? '/mypage' : navigation;
        navigate(nextPage);
      }
    }
  };

  const buttonCSS = buttonEnabled
    ? `w-full h-14 ${rounded ? 'rounded-r-3xl' : ''}`
    : `w-full h-14 bg-[#ececec] text-[#a0a0a0] pointer-events-none ${rounded ? 'rounded-r-3xl' : ''}`;

  return (
    <div className="flex justify-center mb-5 mx-2 w-full">
      <Button variant={'noHover'} onClick={handleClick} className={buttonCSS}>
        {text}
      </Button>
    </div>
  );
}
