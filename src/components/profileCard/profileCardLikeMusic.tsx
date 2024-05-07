const ProfileCardLikeMusic = () => {

  const profileCardLikeMusicStyle = `w-[90%] mx-[5%] mb-[20px] `;
  const CoupleMusicStyle = `font-bold text-[#2F2F2F] text-[0.5rem] `;

  return (
    <div className={profileCardLikeMusicStyle} >
      <p data-testid='likeMusic' className={CoupleMusicStyle}>
        어떤 음악취향을 가진 상대에게 <br /> 호감을 느끼나요 ?
      </p>
    </div>
  );
};

export default ProfileCardLikeMusic;
