import useGetRandomBackgrounds from "@/hooks/useGetRandomBackgrounds/useGetRandomBackgrounds";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import Name from '@/components/common/Name'
import Tag from "../common/Tag";
import { MessageItemProps } from "@/type/services/LikeProfileCard/LikeProfileCard";
import ClickedMessagePopUp from "./ClickedMessagePopUp";
import Time from "../common/Time";

const ReceivedMessageItem = ({ sender,content,messageDate,senderName }: MessageItemProps) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleClick = () => {
    
      setIsClicked(prevState => !prevState);
    
  };

  // 배경색 목록
  const backgrounds = [
    'bg-background-small-grey',
    'bg-background-small-yellow',
    'bg-background-small-green',
    'bg-background-small-kiwi',
    'bg-background-small-purple',
    'bg-background-small-pink',
    'bg-background-small-sky',
  ];

  const currentBackground = useGetRandomBackgrounds({ backgrounds });
  return (
    <>
      <div
        onClick={handleClick}
        className={` h-auto mx-[2%] mb-[8px] pt-[12px] pb-[8px] ${currentBackground} rounded-[16px]`}
      >
        <div className={`flex justify-between px-[3%] `}>
          <div className="flex items-center">
            <Name name={sender?.name} birthDate={sender?.birthDate} mbti={sender?.mbti} />
            <div className='flex flex-wrap mb-[5px]'>
              {sender?.tags?.map((item) => (
                <Tag name={item.name} state={item.state} />
              ))}
            </div>
          </div>
          <div><Time date={messageDate} /></div>
        </div>
        
          <div className={`w-auto mx-2 mt-1 `}>
            <Textarea
              className="text-m text-[#2F2F2F] bg-[#fff] border-0 h-[80px] rounded-[12px]"
              value={content}
              placeholder="메시지보내기"
              readOnly
            />
          </div>
          
      </div>

      {/* 메시지 팝업 클릭했을때 */}
      {isClicked && <ClickedMessagePopUp
        handleClick={handleClick}
        name={sender?.name} birthDate={sender?.birthDate} mbti={sender?.mbti} tags={sender?.tags} messageDate={messageDate} isDark={false}
        content={content} profileId={sender?.profileId} currentBackground={currentBackground} senderName={senderName} send={false}
        />}
    </>
  );
}

export default ReceivedMessageItem;