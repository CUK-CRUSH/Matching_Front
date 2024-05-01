import React from 'react';

import lock from '@/assets/profileCard/lock.svg';

const ProfileCardImage: React.FC = () => {
 
  const profileCardImageStyle = `relative bg-[#2C2C2C] rounded-full w-[3.5rem] h-[3.5rem] p-[1.75rem] `;
  const lockStyle = `absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2`;

  return (
    <div className={profileCardImageStyle} >
      <img className={lockStyle} src={lock} />
    </div>
  );
};

export default ProfileCardImage;
