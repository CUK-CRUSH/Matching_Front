import { Checkbox } from '@/components/ui/checkbox';
import ValidationButton from '@/components/validation/validationButton';
import ValidationText from '@/components/validation/validationText';

const TermsPage = () => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <ValidationText titleTexts={['DUETT 이용약관 및 개인정보 처리방침']} />
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
      </div>
      <ValidationButton navigation="/login" />
    </div>
  );
};

export default TermsPage;
