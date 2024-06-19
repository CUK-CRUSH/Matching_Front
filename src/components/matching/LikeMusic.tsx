import { Textarea } from "@/components/ui/textarea";
import { LikeMusciProps } from "@/type/ProfileCard/ProfileCard";

const LikeMusic = ({likeMusic} : LikeMusciProps) => {

  return (
    <div className={`w-[96%] mt-[24px] mx-[2%]`}>
      <p data-testid='likeMusic' className={`text-[#2F2F2F] text-s ml-[4%] font-bold my-[8px]`}>
        어떤 음악취향을 가진 상대에게 <br /> 호감을 느끼나요 ?
      </p>
      <Textarea 
        className="text-m text-[#2F2F2F] h-[142px]"
        value={likeMusic}
        readOnly
        />
    </div>
  );
};

export default LikeMusic;
