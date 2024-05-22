import { matchingListHeaderProps } from "@/type/MatchingList/MatchingList";
import back from "@/assets/MatchingList/back.svg";
import { useNavigate } from "react-router-dom";

const matchingListHeader = ({text,background,router} : matchingListHeaderProps) => { 

  const navigate = useNavigate();

  const handleNavigate = (router : string | undefined) => {
    {router ? navigate(`/${router}`) : navigate(-1)}
  }

  return (
    <header className={`flex fixed top-[0px] pt-[32px] pb-[12px] w-full max-w-[430px] bg-[${background}]`}>
      <img src={back} alt='back' className={`pl-4 cursor-pointer`} onClick={() => handleNavigate(router)}/>
      <span className={`text-[#F8F8F8] text-xl font-bold pl-4`}>{text}</span>
    </header>
  );
};

export default matchingListHeader;
