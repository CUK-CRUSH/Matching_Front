import { Button } from '@/components/ui/button';
import { ValidationPrevButtonDTO } from '@/type/validation/validation';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';

export default function ValidationPrevButton({
  text = <LeftOutlined />,
  navigation,
  onStateChange,
}: ValidationPrevButtonDTO) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onStateChange) {
      onStateChange();
    } else if (navigation) {
      navigate(navigation);
    }
  };

  const buttonCSS = 'w-12 h-12 ';
  // bg-[#ececec] text-[#a0a0a0]
  return (
    <div className="flex justify-center mb-5 mx-2">
      <Button variant={'noHover'} onClick={handleClick} className={buttonCSS}>
        {text}
      </Button>
    </div>
  );
}
