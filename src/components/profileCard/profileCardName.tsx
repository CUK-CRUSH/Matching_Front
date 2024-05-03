import React from 'react';


const ProfileCardName: React.FC = () => {
 
  const profileCardNameStyle = `h-[2rem] w-[90%] mb-[10px]`;
  
  const nameStyle = `font-bold text-[#000] text-[1rem] mr-[0.2em]`;
  const ageStyle = `text-[#2f2f2f] text-[1rem] opacity-40 mr-[0.2em]`;
  const mbtiStyle =`text-[#2f2f2f] text-[1rem] opacity-40 mr-[0.2em]`;
  const barStyle =`text-[#2f2f2f] text-[1rem] opacity-40 mr-[0.2em]`;
  
  return (
    <div className={profileCardNameStyle} >
      <span className={nameStyle}>
        최서윤
      </span>
      <span className={barStyle}>
        |
      </span>
      <span className={ageStyle}>
        25세
      </span>
      <span className={barStyle}>
        |
      </span>
      <span className={mbtiStyle}>
        ENFJ
      </span>
    </div>
  );
};

export default ProfileCardName;
