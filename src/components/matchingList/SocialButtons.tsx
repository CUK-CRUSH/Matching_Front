import heart from '@/assets/MatchingList/heart.svg';
import message from '@/assets/MatchingList/message.svg';
import { SocialButtonProps } from '@/type/MatchingList/MatchingList';

const SocialButtons = ({ onSelectedToggle, selected } : SocialButtonProps) => {

  const handleSelect = () => {
    // 부모 컴포넌트의 상태를 변경
    onSelectedToggle(selected === 'heart' ? 'message' : 'heart');
  }

  const selectStyle = `absolute -top-[46px] bg-[#252525] text-white w-[52px] h-[50px] flex p-4 rounded-t-[28px]`;
  const selectImgStyle = `flex justify-center items-center`;
  const unSelectStyle = `absolute -top-[40px] bg-[#252525] opacity-70 text-white w-[52px] h-[44px]  flex p-4  rounded-t-[28px]`;
  const unSelectImgStyle = `flex justify-center items-center`;

  return (
    <>
      <div style={{right : 70}} className={selected === 'heart' ? selectStyle : unSelectStyle} onClick={handleSelect}>
        <div className={selected === 'heart' ? selectImgStyle : unSelectImgStyle}> <img src={heart} alt='heart' /> </div>
      </div>

      <div style={{right : 20}} className={selected === 'message' ? selectStyle : unSelectStyle}  onClick={handleSelect}>
        <div className={selected === 'message' ? selectImgStyle : unSelectImgStyle}> <img src={message} alt='message' /> </div>
      </div>

    </>
  );
};

export default SocialButtons;
