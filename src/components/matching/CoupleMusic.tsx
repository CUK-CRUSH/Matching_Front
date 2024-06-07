import thumbnail from '@/assets/ProfileCard/thumbnail.svg';
import { CoupleProps } from '@/type/ProfileCard/ProfileCard';

const CoupleMusic = ({song,artist} : CoupleProps) => {

  return (
    <div className={`w-[90%] mx-[5%] mt-[24px] `}>
      <p data-testid='couple' className={`text-[#2F2F2F] text-s ml-[4%] font-bold my-[8px]`}>
        연인과 함께 듣고싶은 곡
      </p>
      <div className={`bg-white p-[2%] rounded-[16px] flex flex-col items-center`}>
        <img src={thumbnail} alt='thumbnail' />
        <p className={`font-bold text-s text-[#2F2F2F] text-center`}>{song}(따마)</p>
        <p className={`font-semibold text-m text-[#2F2F2F] text-center`}>{artist}</p>
      </div>
    </div>
  );
};

export default CoupleMusic;
