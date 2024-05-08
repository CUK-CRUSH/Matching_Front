const HabitCardTag = () => {

  return (
    // map 반복문으로 대체 예정
    <div className='flex flex-wrap mb-[5px]'>
      <div className={`inline-block py-[4px] px-[8px] border-[1px] border-[#252525] rounded-3xl mr-[5px] mb-[5px]`}>
      <p className={`font-bold text-[#2F2F2F] text-[0.5rem]`}>산책하기</p>
      </div>
      <div className={`inline-block py-[4px] px-[8px] border-[1px] border-[#252525] rounded-3xl mr-[5px] mb-[5px]`}>
        <p className={`font-bold text-[#2F2F2F] text-[0.5rem]`}>노래듣기</p>
      </div>
      
    </div>
  );
};

export default HabitCardTag;
