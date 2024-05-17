import { ReceivedHeartItemProps } from "@/type/MatchingList/MatchingList";
import Name from "@/components/common/name";
import MusicCard from "@/components/matchingList/MusicCard";

const SendedHeartItem = ({name,age,mbti,time,song,singer} : ReceivedHeartItemProps) => {
  
  return (
    <div className={`h-auto mx-[2%] mb-[8px] pt-[12px] pb-[8px] rounded-[16px]`}>
      <div className={`flex justify-between px-[3%] text-[12px]`}>
        <div> <Name name={name} age={age} mbti={mbti} isDark={true}/>  </div>
        <div><p>{time}</p></div>
      </div>

      {<MusicCard song={song} singer={singer} isDark={true} />}

    </div>
  )
}

export default SendedHeartItem