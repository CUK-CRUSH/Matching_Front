import { Textarea } from "@/components/ui/textarea";
import { IntroductionProps } from "@/type/ProfileCard/ProfileCard";

const Introduction = ({introduce} : IntroductionProps) => {

  return (
    <div className={`w-[96%] mt-[24px] mx-[2%]`}>
      <p data-testid='introduction' className={`text-[#2F2F2F] text-s ml-[4%] font-bold my-[8px]`}>
        스스로를 소개해주세요
      </p>
      <Textarea 
        className="text-m text-[#2F2F2F] h-[142px] "
        value={introduce}
        readOnly
        />
        
    </div>
  );
};

export default Introduction;
