export interface TermsCheckBoxDTO {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
}
