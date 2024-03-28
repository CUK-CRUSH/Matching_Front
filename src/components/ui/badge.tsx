import React from 'react';

interface BadgeProps {
  dataName: string;
  backgroundColor: string;
  textColor: string;
}

const Badge: React.FC<BadgeProps> = ({ dataName, backgroundColor, textColor }) => {
  const badgeStyle = `flex justify-center items-center`;
  const textStyle = `px-2 py-1 rounded-xl ${backgroundColor}  ${textColor}`;

  return (
    <div className={badgeStyle}>
      <p className={textStyle}>{dataName}</p>
    </div>
  );
};

export default Badge;
