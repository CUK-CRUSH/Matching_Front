const ProfileCardCoupleMusic = () => {

  const profileCardCoupleMusicStyle = `w-[90%] mx-[5%] mb-[20px] `;
  const CoupleMusicStyle = `font-bold text-[#2F2F2F] text-[0.5rem] `;

  return (
    <div className={profileCardCoupleMusicStyle} >
      <p data-testid='couple' className={CoupleMusicStyle}>
        연인과 함께 듣고싶은 곡
      </p>
    </div>
  );
};

export default ProfileCardCoupleMusic;
