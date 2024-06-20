import AutoResizeTextarea from "@/components/common/AutoResizeTextarea";
import Tag from "@/components/matchingList/Tag";
import Name from "@/components/common/name";
import { ClickedMessagePopUpProps } from "@/type/MatchingList/MatchingList";
import useFindBackgroundIndex from "@/hooks/useFindBackgroundIndex/useFindBackgroundIndex";
import whiteProfile from "@/assets/MatchingList/whiteProfile.svg";
import cancel from "@/assets/MatchingList/cancel.svg";
import blackProfile from "@/assets/MatchingList/blackProfile.svg";

const ClickedMessagePopUp = ({ isClicked, handleClick, currentBackground, name, age, mbti, tag, time, isDark  }: ClickedMessagePopUpProps) => {

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

      {/* 닫기버튼 */}
      <div className=" exceed:w-[400px] flex justify-end px-2 mb-2 cursor-pointer">
        <img src={cancel} alt='cancel' className="" />
      </div>

      {/* 메시지 내용 */}
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}
        className={`exceed:w-[400px] mx-[2%] mb-[8px] pt-[12px] pb-[8px] ${isDark ? 'bg-[#141414] border-[#858585] border': currentBackground} rounded-[16px]`}
      >
        <div className={`flex flex-col`}>
          <div className="px-4 flex items-center">
            <Name name={name} age={age} mbti={mbti} isDark={isDark} />
          </div>
          <div className="flex justify-between px-4 mt-2">
            <Tag tag={tag} isDark={isDark} />
            <p className="text-s">{time}</p>
          </div>
        </div>

        <div className={`w-auto mx-2 mt-1`}>
          <AutoResizeTextarea value={'메시지 보내기메시지 보내기메시지 보내기메시지'} isDark={isDark} />
        </div>

      </div>

      {/* 프로필 */}
      <div className=" exceed:w-[400px] flex justify-end px-2">

        <button className={`${isDark ? 'bg-[#474747]': backgrounds[index]} flex items-center justify-center w-[110px] h-[34px] text-s font-bold rounded-[8px]`}>
          <span className={`mr-1 ${isDark && 'text-[#F8F8F8]'}`}>프로필</span>
          <img src={isDark ? blackProfile : whiteProfile} alt='profile' className="" />
        </button>

      </div>
    </div>
  );
};

export default ClickedMessagePopUp;