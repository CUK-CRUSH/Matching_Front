const MusicCard = () => {
  
  return (
    <div className="mb-[24px]">
    <p data-testid='couple' className={`text-[#2F2F2F] text-s ml-[8%] font-bold my-[8px]`}>
      인생곡 TOP 3
      </p>
      <div className={`mx-[4%] my-[8px] w-[calc(100%-8%)] bg-[#fff] p-[4%] flex justify-between rounded-[11px]`}>
        <span className={`text-m text-[#2F2F2F] font-semibold`}>
          Flaunt It/Cheap (Explicit Ver.)
        </span>
        <span className={`text-s text-[#2F2F2F] font-semibold`}>
          Rae Sremmurd
        </span>
      </div>
      <div className={`mx-[4%] my-[8px] w-[calc(100%-8%)] bg-[#fff] p-[4%] flex justify-between rounded-[11px]`}>
        <span className={`text-m text-[#2F2F2F] font-semibold`}>
          Flaunt It/Cheap (Explicit Ver.)
        </span>
        <span className={`text-s text-[#2F2F2F] font-semibold`}>
          Rae Sremmurd
        </span>
      </div>
      <div className={`mx-[4%] my-[8px] w-[calc(100%-8%)] bg-[#fff] p-[4%] flex justify-between rounded-[11px]`}>
        <span className={`text-m text-[#2F2F2F] font-semibold`}>
          Flaunt It/Cheap (Explicit Ver.)
        </span>
        <span className={`text-s text-[#2F2F2F] font-semibold`}>
          Rae Sremmurd
        </span>
      </div>
    </div>
  );
};

export default MusicCard;
