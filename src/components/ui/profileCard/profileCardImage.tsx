import React from 'react';

import lock from '@/assets/profileCard/lock.svg';

type ProfileCardImageProps = {
  setLock: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileCardImage: React.FC<ProfileCardImageProps> = ({setLock}) => {
 
  const profileCardImageStyle = `relative bg-[#2C2C2C] rounded-full w-[3.5rem] h-[3.5rem] p-[1.75rem] `;
  const lockStyle = `absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2`;

  return (
    <div className={profileCardImageStyle}>
      <img className={lockStyle} src={lock} alt='lock' onClick={() => setLock(prevState => !prevState)} />
    </div>
  );
};

export default ProfileCardImage;
