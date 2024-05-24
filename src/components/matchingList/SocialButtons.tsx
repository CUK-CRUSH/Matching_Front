import heart from '@/assets/MatchingList/heart.svg';
import message from '@/assets/MatchingList/message.svg';
import useMatchingListStateStore from '@/store/matchingListStore';

const SocialButtons = () => {
  
  const {matchingListState, toggleMatchingListState} = useMatchingListStateStore();

  const selectStyle = `absolute -top-[46px] bg-[#252525] text-white w-[52px] h-[50px] flex p-4 rounded-t-[28px]`;
  const selectImgStyle = `flex justify-center items-center`;
  const unSelectStyle = `absolute -top-[40px] bg-[#252525] opacity-70 text-white w-[52px] h-[44px]  flex p-4  rounded-t-[28px]`;
  const unSelectImgStyle = `flex justify-center items-center`;

  return (
    <div className='z-10'>
      <div style={{right : 70}} className={matchingListState === 'heart' ? selectStyle : unSelectStyle}
           onClick={() => toggleMatchingListState(matchingListState === 'heart' ? 'message' : 'heart')}>
        <div className={matchingListState === 'heart' ? selectImgStyle : unSelectImgStyle}> <img src={heart} alt='heart' /> </div>
      </div>

      <div style={{right : 20}} className={matchingListState === 'message' ? selectStyle : unSelectStyle} 
           onClick={() => toggleMatchingListState(matchingListState === 'heart' ? 'message' : 'heart')}>
        <div className={matchingListState === 'message' ? selectImgStyle : unSelectImgStyle}> <img src={message} alt='message' /> </div>
      </div>

    </div>
  );
};

export default SocialButtons;
