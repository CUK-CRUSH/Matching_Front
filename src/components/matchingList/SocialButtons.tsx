import heart from '@/assets/MatchingList/heart.svg';
import message from '@/assets/MatchingList/message.svg';
import { useState } from 'react';

const SocialButtons = () => {
  const [isSelected,setSelect] = useState<string>('heart');

  const handleSelect = () => {
    if(isSelected === 'heart') {
      setSelect('message');
    }
    else {
      setSelect('heart');
    }
  }

  // 252525
  const selectStyle = `absolute -top-[46px] bg-[#252525] text-white w-[52px] h-[50px] flex p-4 rounded-t-[28px]`;
  const selectImgStyle = `flex justify-center items-center`;
  const unSelectStyle = `absolute -top-[40px] bg-[#252525] opacity-70 text-white w-[52px] h-[44px]  flex p-4  rounded-t-[28px]`;
  const unSelectImgStyle = `flex justify-center items-center`;

  return (
    <>
      <div style={{right : 70}} className={isSelected === 'heart' ? selectStyle : unSelectStyle} onClick={handleSelect}>
        <div className={isSelected === 'heart' ? selectImgStyle : unSelectImgStyle}> <img src={heart} alt='heart' /> </div>
      </div>

      <div style={{right : 20}} className={isSelected === 'message' ? selectStyle : unSelectStyle}  onClick={handleSelect}>
        <div className={isSelected === 'message' ? selectImgStyle : unSelectImgStyle}> <img src={message} alt='message' /> </div>
      </div>

    </>
  );
};

export default SocialButtons;
