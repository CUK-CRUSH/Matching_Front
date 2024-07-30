import doubleDown from '@/assets/ProfileCard/double-down.svg';
import { SpreadProfileCardImageProps } from '@/type/ProfileCard/ProfileCard';

const Spread = ({ handleSetOpen,isLock,activeIndex,setIsUnfilledModalOpen,setIsUnlockModalOpen }: SpreadProfileCardImageProps) => {
  return (
    <div className={`w-full flex justify-center items-center cursor-pointer`}          
    onClick={() => {
      if (sessionStorage.getItem('isProfileComplete') === 'false') {
        setIsUnfilledModalOpen?.(true)
      }
      else if (isLock) {
        setIsUnlockModalOpen?.(true);

      } else {
          handleSetOpen(activeIndex, true);
          setIsUnlockModalOpen?.(true);
      }
    }}     
>
    <p className={`font-bold text-[#2F2F2F] text-m flex items-center gap-2`}>
      {isLock ? '잠금해제하고 더 읽기' : '펼쳐보기'}
      <img src={doubleDown} alt="spread" />
    </p>
</div>
  );
};

export default Spread;