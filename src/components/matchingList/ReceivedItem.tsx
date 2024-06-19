import { ItemProps } from "@/type/MatchingList/MatchingList";
import Name from "@/components/common/name";
import useGetRandomBackgrounds from "@/hooks/useGetRandomBackgrounds/useGetRandomBackgrounds";
import MusicCard from "@/components/common/MusicCard";
import Tag from "@/components/matchingList/Tag";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import ClickedMessagePopUp from "@/components/matchingList/ClickedMessagePopUp";

const ReceivedItem = ({ name, age, mbti, tag, time, song, singer, type }: ItemProps) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleClick = () => {
    if (type === 'message') {
      setIsClicked(prevState => !prevState);
    }
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
            <Name name={name} age={age} mbti={mbti} />
            <Tag tag={tag} />
          </div>
          <div><p className="text-s">{time}</p></div>
        </div>
        {type === 'message' ?
          <div className={`w-auto mx-2 mt-1 `}>
            <Textarea
              className="text-m text-[#2F2F2F] bg-[#fff] border-0 h-[80px] rounded-[12px]"
              value={'메시지 보내기'}
              placeholder="메시지보내기"
              readOnly
            />
          </div>
          :
          <MusicCard song={song} artist={singer} isDark={false} />}
      </div>

      {/* 메시지 팝업 클릭했을때 */}
      {isClicked && <ClickedMessagePopUp 
                      isClicked={isClicked}
                      handleClick={handleClick}
                      currentBackground={currentBackground} 
                      name={name} age={age} mbti={mbti} tag={tag} time={time} />}
    </>
  );
}

export default ReceivedItem;