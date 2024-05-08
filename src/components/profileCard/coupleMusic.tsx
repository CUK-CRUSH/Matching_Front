import thumbnail from '@/assets/profileCard/thumbnail.svg';

const CoupleMusic = () => {

  const profileCardCoupleMusicStyle = `w-[90%] mx-[5%] mb-[20px] `;
  const fontStyle = `text-[#2F2F2F] text-[0.5rem] ml-[4%] font-bold my-[8px]`; 
  const coupleMusicStyle = `bg-white p-[2%] rounded-[16px] flex flex-col items-center`; 

  const musicStyle = `text-[0.625rem] text-[#2F2F2F] text-center`; 
  const artistStyle = `font-semibold text-[0.5rem] text-[#2F2F2F] text-center`; 

  return (
    <div className={profileCardCoupleMusicStyle}>
      <p data-testid='couple' className={fontStyle}>
        연인과 함께 듣고싶은 곡
      </p>
      <div className={coupleMusicStyle}>
        <img src={thumbnail} alt='thumbnail' />
        <p className={artistStyle}>SOLE(쏠) & THAMA(따마)</p>
        <p className={musicStyle}>Close to you</p>
      </div>
    </div>
  );
};

export default CoupleMusic;
