import React from 'react';


const ProfileCardName: React.FC = () => {
 
  const profileCardNameStyle = `relative top-[1.5em] left-[3.5em] `;
  
  const nameStyle = `font-bold text-[#000]`;
  const ageStyle = `text-[#2f2f2f] opacity-40	`;
  const mbtiStyle =`text-[#2f2f2f] opacity-40	`;

  return (
    <div className={profileCardNameStyle} >
      <span className={nameStyle}>
        최서윤
      </span>
      
      <span className={ageStyle}>
        | 25세
      </span>
      <span className={mbtiStyle}>
      | ENFJ
      </span>
    </div>
  );
};

export default ProfileCardName;
