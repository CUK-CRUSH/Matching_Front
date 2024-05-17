import { Textarea } from "@/components/ui/textarea";

const Introduction = () => {

  return (
    <div className={`w-[90%] mx-[5%] mt-[24px] `} >
      <p data-testid='introduction' className={`text-[#2F2F2F] text-s ml-[4%] font-bold my-[8px]`}>
        스스로를 소개해주세요
      </p>
      <Textarea 
        className="text-m text-[#2F2F2F] h-[142px] "
        value={'길게 쓰는 자기소개'}
        readOnly
        />
        
    </div>
  );
};

export default Introduction;
