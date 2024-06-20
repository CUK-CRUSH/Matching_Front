import AutoResizeTextarea from "@/components/common/AutoResizeTextarea";
import Tag from "@/components/matchingList/Tag";
import Name from "@/components/common/name";
import { ClickedMessagePopUpProps } from "@/type/MatchingList/MatchingList";
import useFindBackgroundIndex from "@/hooks/useFindBackgroundIndex/useFindBackgroundIndex";

const ClickedMessagePopUp = ({ isClicked, handleClick, currentBackground, name, age, mbti, tag, time }: ClickedMessagePopUpProps) => {

  // 버튼색 배열
  const backgrounds = [
    'bg-background-button-grey',
    'bg-background-button-yellow',
    'bg-background-button-green',
    'bg-background-button-kiwi',
    'bg-background-button-purple',
    'bg-background-button-pink',
    'bg-background-button-sky',
  ];
  // 현재 배경색과 맞는 버튼색을 찾는 custom Hooks
  const index = useFindBackgroundIndex(currentBackground, backgrounds);

  return (
    isClicked &&
    <div onClick={handleClick}
      className="fixed top-0 left-0 w-full h-full inset-0 flex flex-col items-center justify-center bg-opacity-50 bg-black z-50">
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}
        className={`exceed:w-[400px] z-20 h-auto mx-[2%] mb-[8px] pt-[12px] pb-[8px] ${currentBackground} rounded-[16px]`}
      >
        <div className={`flex justify-between px-[3%]`}>
          <div className="flex items-center">
            <Name name={name} age={age} mbti={mbti} />
            <Tag tag={tag} />
          </div>
          <div><p className="text-s">{time}</p></div>
        </div>

        <div className={`w-auto mx-2 mt-1`}>
          <AutoResizeTextarea value={'메시지 보내기메시지 보내기메시지 보내기메시지'} />
        </div>

      </div>
      <div className=" exceed:w-[400px]">

        <button className={`${backgrounds[index]}`}>
          프로필
        </button>

      </div>
    </div>
  );
};

export default ClickedMessagePopUp;