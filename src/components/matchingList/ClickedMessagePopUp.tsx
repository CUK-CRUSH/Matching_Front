import AutoResizeTextarea from "@/components/common/AutoResizeTextarea";
import Tag from "@/components/matchingList/Tag";
import Name from "@/components/common/name";
import { ClickedMessagePopUpProps } from "@/type/MatchingList/MatchingList";

const ClickedMessagePopUp = ({ isClicked, handleClick, currentBackground, name, age, mbti, tag, time}: ClickedMessagePopUpProps) => {
  return (
    isClicked &&
    <div onClick={handleClick}
      className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black z-50">
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
        <div className="flex justify-between exceed:w-[400px] mt-4">
          <button onClick={handleClick}>
            무시하기
          </button>
          <button className={`${currentBackground}`}>
            메시지 보내기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClickedMessagePopUp;