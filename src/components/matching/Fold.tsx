import fold from '@/assets/ProfileCard/fold.svg';
import { FoldProfileCardImageProps } from '@/type/ProfileCard/ProfileCard';

const Fold = ({ setOpen }: FoldProfileCardImageProps) => {

  return (
    <div className={`w-full flex justify-center items-center cursor-pointer `} onClick={() => setOpen(prevState => !prevState)}>
      <p className={`font-bold text-[#2F2F2F] text-m flex items-center gap-2`}>카드 접기  <img src={fold} alt="spread" /></p>
    </div>
  );
};

export default Fold;