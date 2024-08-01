import { ContactUserType } from "@/type/MatchingList/MatchingList"

import Phone from "../../assets/ClickedMessagePopup/Phone.svg"
import Kakao from "../../assets/ClickedMessagePopup/Kakao.svg"
import Paste from "../../assets/ClickedMessagePopup/Paste.svg"

import { useEffect, useState } from "react"

const ContactUser = ({ text }: ContactUserType) => {

  const [icon, setIcon] = useState<boolean>(false);
  
  useEffect(() => {
    if (text?.includes("010") && text.length === 11) {
      setIcon(true);
    }
  }, [text]);

  // 복사하기 함수
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('복사되었습니다!'); // 복사 완료 알림
      })
      .catch(err => {
        console.error('복사 실패:', err);
      });
  };

  return (
    <div className="text-[#474747] text-s px-4 mt-1 flex space-x-1">
      <img src={icon ? Phone : Kakao} alt='x' />
      <span> {text} </span>
      <img 
        className="cursor-pointer"
        src={Paste} 
        alt='복사하기' 
        onClick={handleCopy} // 클릭 시 복사 함수 호출
      />
    </div>
  )
}

export default ContactUser;
