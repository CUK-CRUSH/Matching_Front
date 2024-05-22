import { matchingListHeaderProps } from "@/type/MatchingList/MatchingList";
import back from "@/assets/MatchingList/back.svg";

const matchingListHeader = ({text,background} : matchingListHeaderProps) => { 

  return (
    <header className={`flex fixed top-[0px] pt-[32px] pb-[12px] w-full max-w-[430px] bg-[${background}]`}>
      <img src={back} alt='back' className={`pl-4 cursor-pointer`}/>
      <span className={`text-[#F8F8F8] text-xl font-bold pl-4`}>{text}</span>
    </header>
  );
};

export default matchingListHeader;
