import { ItemProps } from "@/type/MatchingList/MatchingList";
import Name from "@/components/common/Name";
import MusicCard from "@/components/common/MusicCard";
import Tag from "@/components/common/Tag";
import { useState } from "react";
import ClickedMessagePopUp from "@/components/matchingList/ClickedMessagePopUp";
import Time from "@/components/common/Time";

const SendedItem = ({ name, age, mbti, tag, time, song, singer, type }: ItemProps) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleClick = () => {
    if (type === 'message') {
      setIsClicked(prevState => !prevState);
    }
  };

  return (
    <>
      <div className="relative h-auto mx-[2%] mb-[8px] pt-[12px] pb-[8px]"
        onClick={handleClick}
      >
        <div className="flex justify-between px-[3%] text-s">
          <div className="flex items-center">
            <Name name={name} age={age} mbti={mbti} isDark={true} />
            <Tag tag={tag} isDark={true} />
          </div>
          <div><Time time={time} /></div>
        </div>

        <MusicCard song={song} artist={singer} isDark={true} />
        {/* 메시지 팝업 클릭했을때 */}


        {/* 하단 테두리 */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-4%)] h-[1px] bg-[#191919]" />

      </div>
      {isClicked && <ClickedMessagePopUp
        handleClick={handleClick}
        name={name} age={age} mbti={mbti} tag={tag} time={time} isDark={true} />}
    </>
  );
};

export default SendedItem;
