import lock from '@/assets/Profile/lock.svg';
import { ProfileImageProps } from '@/type/ProfileCard/ProfileCard';

const ProfileImage = ({setLock} : ProfileImageProps) => {

  return (
    <div className={`relative bg-[#2C2C2C] rounded-full w-[3.5rem] h-[3.5rem] p-[1.75rem] `}>
      <img className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2`} 
           src={true ? lock: 'profileImage'} 
           alt='lock' 
           onClick={() => setLock(prevState => !prevState)} />
    </div>
  );
};

export default ProfileImage;
