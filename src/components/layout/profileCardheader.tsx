// import useProfileCardStore from "@/store/profileCardStore";

import coinLogo from '@/assets/ProfileCard/coin.svg';
import OpenedProfileCardIcon from '@/assets/ProfileCard/openedProfileCardIcon.svg';
import logo from '@/assets/ProfileCard/logo.svg';
import { Link } from 'react-router-dom';

const ProfileCardHeader = () => {
  // const {coin} = useProfileCardStore();

  return (
    <header className="fixed top-0 w-full max-w-[430px] mx-auto h-[60px] bg-[#252525] z-50 flex justify-between items-center px-4">
      <div>
        <Link to="/matching">
          <img src={logo} alt="." />
        </Link>
      </div>

      <div className="flex items-center flex-row justify-center space-x-1" data-testid="currency">
        <Link to="./openedProfileCard">
          <img className={``} src={OpenedProfileCardIcon} alt="coin" />
        </Link>

        <img src={coinLogo} alt="coin" />
        <div className="h-5 my-auto text-[#F8F8F8]">
          {/* {coin} */}
          Free
        </div>
      </div>
    </header>
  );
};

export default ProfileCardHeader;
