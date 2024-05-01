import React from 'react';

const ProfileHabitCardTag: React.FC = () => {
  const profileCardHabitTagStyle = `inline-block p-[3px] border-[1px] border-[#252525] rounded-3xl mr-[5px] mb-[5px]`;
  const tagStyle = `font-bold text-[#2F2F2F] text-[0.7rem]`;

  return (
    // map 반복문으로 대체 예정
    <div className='flex flex-wrap mb-[5px]'>
      <div className={profileCardHabitTagStyle}>
        <p className={tagStyle}>십오자십오자십오자십오자십오자</p>
      </div>
      <div className={profileCardHabitTagStyle}>
        <p className={tagStyle}>십오</p>
      </div>
      <div className={profileCardHabitTagStyle}>
        <p className={tagStyle}>국내/국외 힙합 국내/국외 힙합</p>
      </div>
    </div>
  );
};

export default ProfileHabitCardTag;
