import offMessage from "@/assets/ProfileCard/offMessage.svg";
import onMessage from "@/assets/ProfileCard/onMessage.svg";
import offHeart from "@/assets/ProfileCard/offHeart.svg";
import onHeart from "@/assets/ProfileCard/onHeart.svg";
import useProfileCardStore from "@/store/profileCardStore";

const Post = () => {
  
  const { openMessage, setOpenMessage } = useProfileCardStore();

  return (
    // margin bottom 으로 스크롤 범위 조작
      <div className={`w-[calc(100%-16%)] mx-[8%] flex justify-end mt-[10px] mb-[150px] ml-[15px]`}>
        <img src={true ? offHeart : onHeart} alt="heart" className={`mr-3`} />

        <img src={openMessage ? onMessage : offMessage} alt="message" onClick={setOpenMessage}/>
      </div>
    )
}

export default Post;