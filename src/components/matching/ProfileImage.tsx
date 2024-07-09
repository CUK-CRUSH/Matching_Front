import lock from '@/assets/ProfileCard/lock.svg';
import { ProfileImageProps } from '@/type/ProfileCard/ProfileCard';

const ProfileImage = ({ handleSetOpen, handleSetModalOpen, isLock, activeIndex }: ProfileImageProps) => {
  return (
    <div className={`relative bg-[#2C2C2C] rounded-full w-[3.5rem] h-[3.5rem] p-[1.75rem] `}>
      <img className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2`}
        src={isLock ? lock : 'profileImage'}
        alt='lock'
        onClick={() => {
          if (isLock) {
            handleSetModalOpen(activeIndex, true);
          } else {
            handleSetOpen(activeIndex, true);
            handleSetModalOpen(activeIndex, true);
          }
        }}
      />
    </div>
  );
};

export default ProfileImage;
