const ProfileCardIntroduction = () => {

  const profileCardIntroductionStyle = `w-[90%] mx-[5%] mb-[20px] `;
  const CoupleMusicStyle = `font-bold text-[#2F2F2F] text-[0.5rem] `;

  return (
    <div className={profileCardIntroductionStyle} >
      <p data-testid='introduction' className={CoupleMusicStyle}>
        스스로를 소개해주세요
      </p>
    </div>
  );
};

export default ProfileCardIntroduction;
