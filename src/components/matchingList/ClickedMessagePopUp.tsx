import AutoResizeTextarea from "@/components/common/AutoResizeTextarea";
import Name from "@/components/common/Name"
import { ClickedMessagePopUpProps } from "@/type/MatchingList/MatchingList";
import useFindBackgroundIndex from "@/hooks/useFindBackgroundIndex/useFindBackgroundIndex";
import whiteProfile from "@/assets/MatchingList/whiteProfile.svg";
import cancel from "@/assets/MatchingList/cancel.svg";
import blackProfile from "@/assets/MatchingList/blackProfile.svg";
import { useNavigate } from "react-router-dom";
import Tag from "../common/Tag";
import Time from "../common/Time";

const ClickedMessagePopUp = ({ handleClick, currentBackground, name, birthDate, mbti, content,tags,messageDate, profileId, isDark }: ClickedMessagePopUpProps) => {
  console.log(isDark)
  const navigate = useNavigate();

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

  // 프로필로 이동
  const goToProfile = (e: React.MouseEvent<HTMLElement>) => {
    navigate(`/matching/${profileId}`)
    e.stopPropagation();
  };

  return (
    <div onClick={handleClick}
      className="fixed top-0 left-0 w-full h-full inset-0 flex flex-col items-center justify-center bg-opacity-50 bg-black z-50">

      {/* 닫기버튼 */}
      <div className="exceed:w-[400px] w-[80%] flex justify-end px-2 mb-2 cursor-pointer">
        <img src={cancel} alt='cancel' className="" />
      </div>

      {/* 메시지 내용 */}
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => e.stopPropagation()}
        className={`exceed:w-[400px] w-[80%] mx-[2%] mb-[8px] pt-[12px] pb-[8px]
                   ${isDark ? 'bg-[#141414] border-[#858585] border' : currentBackground} rounded-[16px]`}
      >
        <div className={`flex flex-col mb-2`}>
          <div className="px-4 flex justify-between items-center">
            <Name name={name} birthDate={birthDate} mbti={mbti} isDark={isDark} />
            <div>
              <Time date={messageDate} />
            </div>
          </div>
          <div className="flex justify-between px-4">
            <div className="flex">
              {tags?.map((item) => (
                <Tag name={item.name} state={item.state} isDark={isDark} />
              ))}
            </div>
          </div>
        </div>

        {/* <div className="relative h-auto overflow-y-scroll scrollbar-hide" ref={outerContainerRef} onScroll={calculateThumbY}> */}
        {/* <ScrollBarThumb ref={thumbRef} height={thumbH} /> */}
          <div className={`h-auto mt-[12px] mb-2 mx-2`}>
            <AutoResizeTextarea value={content} isDark={isDark} />
          </div>
        {/* </div> */}

      </div>

      {/* 프로필 */}
      <div className=" exceed:w-[400px] w-[80%] flex justify-end px-2">

        <button
          onClick={goToProfile}
          className={`${isDark ? 'bg-[#474747]' : backgrounds[index]} flex items-center justify-center w-[110px] h-[34px] text-s font-bold rounded-[8px]`}>
          <span

            className={`mr-1 ${isDark && 'text-[#F8F8F8]'}`}>프로필</span>
          <img src={isDark ? blackProfile : whiteProfile} alt='profile' className="" />
        </button>

      </div>
    </div>
  );
};

export default ClickedMessagePopUp;