import message from "@/assets/ProfileCard/message.svg";
import heart from "@/assets/ProfileCard/heart.svg";

const Post = () => {

  return (
      <div>
        <img src={message as unknown as string} alt="message" />
        <img src={heart as unknown as string} alt="heart" />
      </div>
    )
}

export default Post;