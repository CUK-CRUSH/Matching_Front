import { ReceivedHeartItemProps } from "@/type/MatchingList/MatchingList";
import Name from "@/components/common/name";
import useGetRandomBackgrounds from "@/hooks/useGetRandomBackgrounds/useGetRandomBackgrounds";

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

      <div className={`h-[35px] mx-[2%] mt-[4px] rounded-[12px] text-[#2f2f2f] bg-[#fff] py-[10px] px-[4%] flex justify-between items-center text-[12px]`}>
        <p>{song}</p>
        <p>{singer}</p>
      </div>

    </div>
  )
}

export default ReceivedHeartItem