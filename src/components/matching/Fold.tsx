import up from '@/assets/ProfileCard/up.svg';
import { OpenProfileCardImageProps } from '@/type/ProfileCard/ProfileCard';

const Fold = ({ setLock }: OpenProfileCardImageProps) => {
  return (
    <div className={`w-full flex justify-center items-center cursor-pointer `} onClick={() => setLock(prevState => !prevState)}>
      <p className={`font-bold text-[#2F2F2F] text-m flex items-center gap-2`}> 카드 접기<img src={up} alt="Fold" /></p>
    </div>
  )
}

export default Fold;