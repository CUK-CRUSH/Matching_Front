import { Button } from '@/components/ui/button';
import { ValidationButtonDTO } from '@/type/validation/validation';
import { useNavigate } from 'react-router-dom';

export default function ValidationButton({
  text = '다음',
  navigation,
  buttonEnabled = true,
  onStateChange,
}: ValidationButtonDTO) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (buttonEnabled) {
      if (onStateChange) {
        onStateChange(); // Perform the state update if the handler is provided
      } else if (navigation) {
        navigate(navigation); // Navigate to a path if specified
      }
    }
  };

  const buttonCSS = buttonEnabled
    ? 'w-full h-12'
    : 'w-full h-12 bg-[#ececec] text-[#a0a0a0] pointer-events-none';

  return (
    <div className="flex justify-center mb-5 mx-2 w-full">
      <Button onClick={handleClick} className={buttonCSS}>
        {text}
      </Button>
    </div>
  );
}
