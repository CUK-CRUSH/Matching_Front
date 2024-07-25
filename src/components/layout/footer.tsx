import footer from "@/assets/Layout/Footer.svg";
import offMessage from "@/assets/Layout/offMessage.svg";
import offMyPage from "@/assets/Layout/offMyPage.svg";
import offMatching from "@/assets/Layout/offMatching.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerStyle = {
    backgroundImage: `url(${footer})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto h-[80px] z-50 text-center dark:bg-neutral-600 flex justify-center items-center" 
          style={footerStyle}>
      {/* 아이콘 배치 */}
      <div className="flex justify-around w-full max-w-[350px]">
        <Link to='/matchinglist'>
          <img src={offMessage} alt="Message" />
        </Link>
        <div className={`w-[5rem] h-[5rem] bg-[#2C2C2C] rounded-full -mt-[62px] flex justify-center items-center ml-1`}>
          <Link to='/matching'>
            <img src={offMatching} alt="Matching" />
          </Link>
        </div>
        <Link to='/mypage'>
          <img src={offMyPage} alt="My Page" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
