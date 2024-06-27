import { ItemProps } from "@/type/MatchingList/MatchingList";
import Name from "@/components/common/Name";
import MusicCard from "@/components/common/MusicCard";
import Tag from "@/components/matchingList/Tag";

const SendedItem = ({ name, age, mbti, tag, time, song, singer }: ItemProps) => {
  return (
    <div className="relative h-auto mx-[2%] mb-[8px] pt-[12px] pb-[8px]">
      <div className="flex justify-between px-[3%] text-s">
        <div className="flex items-center">
          <Name name={name} age={age} mbti={mbti} isDark={true} />
          <Tag tag={tag} isDark={true} />
        </div>
        <div><p className="text-s">{time}</p></div>
      </div>

      <MusicCard song={song} artist={singer} isDark={true} />

      {/* 하단 테두리 */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-4%)] h-[1px] bg-[#191919]"></div>
    </div>
  );
};

export default SendedItem;
