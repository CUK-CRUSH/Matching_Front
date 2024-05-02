import { Button } from '@/components/ui/button';
import { ValidationButtonDTO } from '@/type/validation/validation';
import { useNavigate } from 'react-router-dom';

export default function ValidationButton({ text = '다음', navigation }: ValidationButtonDTO) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (navigation) {
      navigate(navigation);
    }
  };
  return (
    <div className="flex justify-center mb-5 mx-2">
      <Button onClick={handleClick} className="w-full h-12">
        {text}
      </Button>
    </div>
  );
}
