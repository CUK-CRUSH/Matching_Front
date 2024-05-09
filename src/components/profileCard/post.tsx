import message from "@/assets/ProfileCard/message.svg";
import heart from "@/assets/ProfileCard/heart.svg";

const Post = () => {

  return (
    // margin bottom 으로 스크롤 범위 조작
      <div className={`w-[calc(100%-16%)] mx-[8%] flex justify-end mt-[10px] mb-[150px] ml-[15px]`}>
        <img src={heart} alt="heart" className={`mr-3`} />

        <img src={message} alt="message" />
      </div>
    )
}

export default Post;