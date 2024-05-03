import React from 'react';

const ProfileMusicCardTag: React.FC = () => {
  const profileCardMusicTagStyle = `inline-block py-[4px] px-[8px] border-[1px] border-[#252525] rounded-3xl mr-[5px] mb-[5px]`;
  const tagStyle = `font-bold text-[#2F2F2F] text-[0.5rem]`;

  return (
    // map 반복문으로 대체 예정
    <div className='flex flex-wrap mb-[5px]'>
      <div className={profileCardMusicTagStyle}>
        <p className={tagStyle}>십오자십오자십십</p>
      </div>
      <div className={profileCardMusicTagStyle}>
        <p className={tagStyle}>십오자십오자자십</p>
      </div>
      <div className={profileCardMusicTagStyle}>
        <p className={tagStyle}>십오자십오자십십</p>
      </div>
    </div>
  );
};

export default ProfileMusicCardTag;
