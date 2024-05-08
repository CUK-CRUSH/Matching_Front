import ellipsis from "@/assets/profileCard/ellipsis.svg";

const BlankMusicCard = () => {
  
  return (
    <div>
      <div className={`flex justify-center`}>
      <img src={ellipsis} alt='ellipsis' />
      </div>
      <div className={`mx-[4%] mt-[8px] w-[calc(100%-8%)] bg-[#fff] p-[4%] 
                      flex justify-between rounded-[11px] 
                      bg-[linear-gradient(to top, #FFFFFF80 0%, #FFFFFF80 100%)]`} >
                        
        <span className={`text-[0.6875rem] text-[#2F2F2F] font-semibold invisible`}>aa</span>
      </div>
    </div>
  );
};

export default BlankMusicCard;