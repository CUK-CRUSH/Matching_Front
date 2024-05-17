import { ReceivedHeartItemProps } from "@/type/MatchingList/MatchingList";
import { useEffect, useState } from "react";
import Name from "@/components/common/name";

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

  // 이전 배경색 상태와 현재 배경색 상태
  const [previousBackground, setPreviousBackground] = useState<string>('');
  const [currentBackground, setCurrentBackground] = useState<string>('');

  // 컴포넌트 마운트 시 또는 이전 배경색이 변경될 때 실행
  useEffect(() => {
    // 이전 배경색을 제외한 새로운 배경색 목록 생성
    const newBackgrounds = backgrounds.filter((bg) => bg !== previousBackground);

    // 새로운 배경색 목록에서 랜덤으로 하나 선택
    const randomBackground = newBackgrounds[Math.floor(Math.random() * newBackgrounds.length)];

    // 현재 배경색을 업데이트하고, 이전 배경색 상태도 업데이트
    setCurrentBackground(randomBackground);
    setPreviousBackground(currentBackground);
  }, [previousBackground]);

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