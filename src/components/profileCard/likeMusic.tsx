import { Textarea } from "@/components/ui/textarea";

const LikeMusic = () => {

  return (
    <div className={`w-[90%] mx-[5%] mb-[20px]`} >
      <p data-testid='likeMusic' className={`text-[#2F2F2F] text-[0.5rem] ml-[4%] font-bold my-[8px]`}>
        어떤 음악취향을 가진 상대에게 <br /> 호감을 느끼나요 ?
      </p>
      <Textarea 
        className="text-[0.5rem] text-[#2F2F2F]"
        value={'나는 이런 음악취향을 가진 상대에게 호감을 느낀다'}
        readOnly
        />
    </div>
  );
};

export default LikeMusic;
