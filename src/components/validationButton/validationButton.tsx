import { Button } from '@/components/ui/button';
import { ValidationButtonDTO } from '@/type/validationButton/validationButton';

export default function ValidationButton({ text = '다음' }: ValidationButtonDTO) {
  return (
    <div className="flex justify-center mb-5 mx-2">
      <Button className="w-full h-12">{text}</Button>
    </div>
  );
}
