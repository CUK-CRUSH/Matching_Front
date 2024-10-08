import { useState } from "react";
import MusicCard from "../common/MusicCard";
import Tag from "../common/Tag";
import Name from '@/components/common/Name'
import { MessageItemProps } from "@/type/services/LikeProfileCard/LikeProfileCard";
import ClickedMessagePopUp from "./ClickedMessagePopUp";
import Time from "../common/Time";


const SendedMessageItem = ({ receiver,content,messageDate,senderName }: MessageItemProps) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleClick = () => {
      setIsClicked(prevState => !prevState);
  };
  return (
    <>
      <div className="relative h-auto mx-[2%] mb-[8px] pt-[12px] pb-[8px]"
        onClick={handleClick}
      >
        <div className="flex justify-between px-[3%] text-s">
          <div className="flex items-center">
          <Name name={receiver?.name} birthDate={receiver?.birthDate} mbti={receiver?.mbti} isDark={true} />
          <div className='flex flex-wrap mb-[5px]'>
              {receiver?.tags?.map((item) => (
                <Tag name={item.name} state={item.state} isDark={true} />
              ))}
            </div>      
          </div>
          <div><Time date={messageDate} /></div>
        </div>

        <MusicCard title={receiver?.lifeMusic?.title} artist={receiver?.  lifeMusic?.artist} />
        {/* 메시지 팝업 클릭했을때 */}


        {/* 하단 테두리 */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-4%)] h-[1px] bg-[#191919]" />

      </div>
      {isClicked && <ClickedMessagePopUp
        handleClick={handleClick}
        name={receiver?.name} birthDate={receiver?.birthDate} mbti={receiver?.mbti} tags={receiver?.tags} messageDate={messageDate} isDark={true}
        content={content} profileId={receiver?.profileId} senderName={senderName} send={true}
        />}
    </>
  );
};

export default SendedMessageItem;
