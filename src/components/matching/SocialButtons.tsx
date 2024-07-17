import offMessage from "@/assets/ProfileCard/offMessage.svg";
import onMessage from "@/assets/ProfileCard/onMessage.svg";
import offHeart from "@/assets/ProfileCard/offHeart.svg";
import onHeart from "@/assets/ProfileCard/onHeart.svg";
import useProfileCardStore from "@/store/profileCardStore";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { likeProfile } from "@/services/ProfileCard/LikeProfileCard";
import { SocialButtonsProps } from "@/type/ProfileCard/ProfileCard";
import { useCookies } from "react-cookie";

const SocialButtons = ({ profileId }: SocialButtonsProps) => {
  console.log(profileId)
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;
  const { openMessage, setOpenMessage } = useProfileCardStore();
  console.log(import.meta.env.VITE_DUETT_TOKEN)
  const [isLike, setLike] = useState<boolean>(false);



  const handleLike = () => {
    likeProfile(import.meta.env.VITE_DUETT_TOKEN, profileId)
      .then(() => {
        setLike(!isLike);
        toast({
          title: isLike ? "좋아요가 취소되었습니다." : "좋아요가 전송되었습니다.",
          className:
            'h-[40px] w-[90%] fixed top-[60px] left-1/2 transform -translate-x-1/2 flex justify-center rounded-[8px] exceed:w-[358px]',
        });
      })
      .catch((error) => {
        console.error('좋아요를 하지 못했습니다:', error);
        toast({
          title: "좋아요를 하지 못했습니다.",
          className:
            'h-[40px] w-[90%] fixed top-[60px] left-1/2 transform -translate-x-1/2 flex justify-center rounded-[8px] exceed:w-[358px]',
        });
      });
  };

  return (
    // margin bottom 으로 스크롤 범위 조작
    <div className={`w-[calc(100%-10%)] mx-[5%] flex justify-end mt-[10px] mb-[150px] ml-[15px]`}>
      <img src={!isLike ? offHeart : onHeart} alt="heart" className={`mr-3`} onClick={handleLike} />

      <img src={openMessage ? onMessage : offMessage} alt="message" onClick={setOpenMessage} />
    </div>
  )
}

export default SocialButtons;