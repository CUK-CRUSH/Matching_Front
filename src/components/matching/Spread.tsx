import doubleDown from '@/assets/ProfileCard/double-down.svg';
import { SpreadProfileCardImageProps } from '@/type/ProfileCard/ProfileCard';

const Spread = ({ setOpenModal,setOpen,isLock }: SpreadProfileCardImageProps) => {

  return (
    <div className={`w-full flex justify-center items-center cursor-pointer `}          
    onClick={() => isLock ? setOpenModal(prevState => !prevState) : setOpen(true)} >
    
      <p className={`font-bold text-[#2F2F2F] text-m flex items-center gap-2`}>잠금해제하고 더 읽기 <img src={doubleDown} alt="spread" /></p>
    </div>
  );
};

export default Spread;