import "@/styles/Footer.css";
import footer from "@/assets/Layout/Footer.svg";
import offMessage from "@/assets/Layout/offMessage.svg";
import offMyPage from "@/assets/Layout/offMyPage.svg";
import offMatching from "@/assets/Layout/offMatching.svg";

const Footer = () => {
  const footerStyle = {
    backgroundImage: `url(${footer})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto h-[80px] z-50 text-center dark:bg-neutral-600 flex justify-center items-center" style={footerStyle}>
      {/* 아이콘 배치 */}
      <div className="flex justify-around w-full max-w-[350px]">
        <img src={offMessage} alt="Message" />
        <div className={`w-[4rem] h-[4rem] bg-[#2C2C2C] rounded-full -mt-[50px] flex justify-center items-center ml-1`}>
          <img src={offMatching} alt="Matching" />
        </div>

        <img src={offMyPage} alt="My Page" />
      </div>
    </footer>
  );
};

export default Footer;
