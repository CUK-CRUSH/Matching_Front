import { Textarea } from "@/components/ui/textarea";

interface UserTasteProps {
  title: string;
  value?: string;
  testId: string;
}

const UserTaste = ({ title, value, testId }: UserTasteProps) => {
  return (
    <div className={`w-[96%] mt-[24px] mx-[2%]`}>
      <p data-testid={testId} className={`text-[#2F2F2F] text-s ml-[4%] font-bold my-[8px]`}>
        {title}
      </p>
      <Textarea 
        className="text-m text-[#2F2F2F] h-[142px] bg-transparent"
        value={value}
        readOnly
      />
    </div>
  );
};

export default UserTaste;