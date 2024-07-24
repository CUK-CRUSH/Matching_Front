import { Checkbox } from '@/components/ui/checkbox';
import { TermsCheckBoxDTO } from '@/type/terms/terms';

const TermsCheckBox = ({ id, label, checked, onChange, required = false }: TermsCheckBoxDTO) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} checked={checked} onCheckedChange={onChange} />
      <label
        htmlFor={id}
        className="text-sm text-text_dary_soft font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label} {required}
      </label>
    </div>
  );
};

export default TermsCheckBox;
