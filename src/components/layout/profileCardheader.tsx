import useProfileCardStore from "@/store/profileCardStore";

import coinLogo from "@/assets/ProfileCard/coin.svg";
import OpenedProfileCardIcon from "@/assets/ProfileCard/openedProfileCardIcon.svg";
import { Link } from "react-router-dom";

const ProfileCardHeader = () => { 
  const {coin} = useProfileCardStore();

  return (
    <header className="fixed top-0 w-full max-w-[430px] mx-auto h-[60px] bg-[#252525] z-50 flex justify-between items-center px-4">
      <div>
        로고
      </div>
      
      <div className="flex items-center " data-testid='currency'> 
      <Link to='./openedProfileCard'>
      <img className={`mx-1`} src={OpenedProfileCardIcon} alt='coin' />
      </Link>
      <div className={`mx-1 flex`}>
        <img src={coinLogo} alt='coin' />
        <span className="text-[1.2rem] text-[#F8F8F8] ml-[2px]">{coin}</span> 
      </div>
      </div>
    </header>
  );
};

export default ProfileCardHeader;
