import offMessage from "@/assets/ProfileCard/offMessage.svg";
import onMessage from "@/assets/ProfileCard/onMessage.svg";
import offHeart from "@/assets/ProfileCard/offHeart.svg";
import onHeart from "@/assets/ProfileCard/onHeart.svg";
import useProfileCardStore from "@/store/profileCardStore";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const SocialButtons = () => {
  
  const { openMessage, setOpenMessage } = useProfileCardStore();

  const [isLike,setLike] = useState<boolean>(false);

  const handleLike = () =>{
    {!isLike &&
    toast({
      title: "좋아요가 전송되었습니다.",
      className:
        'h-[40px] w-[90%] fixed top-[60px] left-1/2 transform -translate-x-1/2 flex justify-center rounded-[8px] exceed:w-[358px]',
    })
    }
    setLike(prev => !prev)
  }

  return (
    // margin bottom 으로 스크롤 범위 조작
      <div className={`w-[calc(100%-10%)] mx-[5%] flex justify-end mt-[10px] mb-[150px] ml-[15px]`}>
        <img src={!isLike ? offHeart : onHeart} alt="heart" className={`mr-3`} onClick={handleLike} />

        <img src={openMessage ? onMessage : offMessage} alt="message" onClick={setOpenMessage}/>
      </div>
    )
}

export default SocialButtons;