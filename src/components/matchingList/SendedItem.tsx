import { ReceivedItemProps } from "@/type/MatchingList/MatchingList";
import Name from "@/components/common/name";
import MusicCard from "@/components/matchingList/MusicCard";
import Tag from "@/components/matchingList/Tag";

const SendedItem = ({ name, age, mbti, tag, time, song, singer }: ReceivedItemProps) => {

  return (
    <div className={`h-auto mx-[2%] mb-[8px] pt-[12px] pb-[8px] rounded-[16px]`}>
      <div className={`flex justify-between px-[3%] text-s`}>
        <div className="flex items-center">
          <Name name={name} age={age} mbti={mbti} isDark={true} />
          <Tag tag={tag} isDark={true} />
        </div>
        <div><p className="text-s">{time}</p></div>
      </div>

      {<MusicCard song={song} singer={singer} isDark={true} />}

    </div>
  )
}

export default SendedItem