import { ItemProps } from "@/type/MatchingList/MatchingList";
import useGetRandomBackgrounds from "@/hooks/useGetRandomBackgrounds/useGetRandomBackgrounds";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import Name from "../common/Name";
import Tag from "../common/Tag";
import MusicCard from "../common/MusicCard";
import MoodMusic from "../matching/MoodMusic";
// import Time from "@/components/common/Time";
const ReceivedItem = ({ name, birthDate, mbti, tags, lifeMusic, type }: ItemProps) => {
  const [, setIsClicked] = useState<boolean>(false);

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
  console.log(lifeMusic)
  return (
    <>
      <div
        onClick={handleClick}
        className={` h-auto mx-[2%] mb-[8px] pt-[12px] pb-[8px] ${currentBackground} rounded-[16px]`}
      >
        <div className={`flex justify-between px-[3%] `}>
          <div className="flex items-center">
            <Name name={name} birthDate={birthDate} mbti={mbti} />
            <div className='flex flex-wrap mb-[5px]'>
              {tags?.map((item) => (
                <Tag name={item.name} state={item.state} />
              ))}
            </div>
          </div>
          {/* <div><Time time={time} /></div> */}
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
          <>
            <MusicCard title={lifeMusic?.title} artist={lifeMusic?.artist} />
            
          </>
        }
      </div>

      {/* 메시지 팝업 클릭했을때 */}
      {/* {isClicked && <ClickedMessagePopUp 
                      handleClick={handleClick}
                      currentBackground={currentBackground} 
                      name={name} age={age} mbti={mbti} tag={tag} time={time} />} */}
    </>
  );
}

export default ReceivedItem;
