import { matchingListHeaderProps } from "@/type/MatchingList/MatchingList";
import back from "@/assets/MatchingList/back.svg";

const matchingListHeader = ({text} : matchingListHeaderProps) => { 

  return (
    <div className={`flex absolute -top-[35px]`}>
      <img src={back} alt='back' className={`pl-4 cursor-pointer`}/>
      <span className={`text-[#F8F8F8] text-xl font-bold pl-4`}>{text}</span>
    </div>
  );
};

export default matchingListHeader;
