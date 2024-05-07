const ProfileCardMusicCard = () => {
  const profileCardMusicCardStyle = `mx-[4%] my-[8px] w-[calc(100%-8%)] bg-[#fff] p-[4%] flex justify-between rounded-[11px]`;
  const titleStyle = `text-[0.6875rem] text-[#2F2F2F] font-semibold`;
  const singerStyle = `text-[0.6875rem] text-[#2F2F2F] font-semibold`;

  return (
    <>
      <div className={profileCardMusicCardStyle}>
        <span className={titleStyle}>
          Flaunt It/Cheap (Explicit Ver.)
        </span>
        <span className={singerStyle}>
          Rae Sremmurd
        </span>
      </div>
      <div className={profileCardMusicCardStyle}>
        <span className={titleStyle}>
          Flaunt It/Cheap (Explicit Ver.)
        </span>
        <span className={singerStyle}>
          Rae Sremmurd
        </span>
      </div>
      <div className={profileCardMusicCardStyle}>
        <span className={titleStyle}>
          Flaunt It/Cheap (Explicit Ver.)
        </span>
        <span className={singerStyle}>
          Rae Sremmurd
        </span>
      </div>
    </>
  );
};

export default ProfileCardMusicCard;
