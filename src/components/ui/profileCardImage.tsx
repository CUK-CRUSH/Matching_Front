import React from 'react';

import lock from '@/assets/profileCard/lock.svg';

const ProfileCardImage: React.FC = () => {
 
  const profileCardImageStyle = `relative top-[28px] left-[32px] bg-[#000] rounded-full w-[60px] h-[60px] z-5 `;
  const lockStyle = `absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-[4%]`;

  return (
    <div className={profileCardImageStyle} >
      <img className={lockStyle} src={lock} />
    </div>
  );
};

export default ProfileCardImage;
