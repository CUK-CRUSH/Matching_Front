import lock from '@/assets/ProfileCard/lock.svg';
import { ProfileCardImageProps } from '@/type/ProfileCard/ProfileCard';

const ProfileCardImage = ({setLock} : ProfileCardImageProps) => {


  return (
    <div className={`relative bg-[#2C2C2C] rounded-full w-[3.5rem] h-[3.5rem] p-[1.75rem] `}>
      <img className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2`} 
           src={lock} 
           alt='lock' 
           onClick={() => setLock(prevState => !prevState)} />
    </div>
  );
};

export default ProfileCardImage;
