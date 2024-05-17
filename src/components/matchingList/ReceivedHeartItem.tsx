import { ReceivedHeartItemProps } from "@/type/MatchingList/MatchingList";
import Name from "@/components/common/name";
import useGetRandomBackgrounds from "@/hooks/useGetRandomBackgrounds/useGetRandomBackgrounds";
import MusicCard from "@/components/matchingList/MusicCard";

const ReceivedHeartItem = ({name,age,mbti,time,song,singer} : ReceivedHeartItemProps) => {
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

  const currentBackground = useGetRandomBackgrounds({backgrounds});

  return (
    <div className={`h-auto mx-[2%] mb-[8px] pt-[12px] pb-[8px] ${currentBackground} rounded-[16px]`}>
      <div className={`flex justify-between px-[3%] text-[12px]`}>
        <div> <Name name={name} age={age} mbti={mbti} />  </div>
        <div><p>{time}</p></div>
      </div>

      {<MusicCard song={song} singer={singer} isDark={false} />}

    </div>
  )
}

export default ReceivedHeartItem