const MusicCardTag = () => {

  return (
    // map 반복문으로 대체 예정
    <div className='flex flex-wrap mb-[5px]'>
      <div className={`inline-block py-[4px] px-[14px] border-[1px] border-[#252525] rounded-3xl mr-[5px] mb-[5px]`}>
        <p className={`font-bold text-[#2F2F2F] text-s`}>인디밴드 쳐돌이</p>
      </div>
      <div className={`inline-block py-[4px] px-[14px] border-[1px] border-[#252525] rounded-3xl mr-[5px] mb-[5px]`}>
        <p className={`font-bold text-[#2F2F2F] text-s`}>국내/국외 힙합</p>
      </div>
      
    </div>
  );
};

export default MusicCardTag;
