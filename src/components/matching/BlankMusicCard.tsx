import ellipsis from "@/assets/ProfileCard/ellipsis.svg";

const BlankMusicCard = () => {
  
  return (
    <div>
      <div className={`flex justify-center`}>
      <img src={ellipsis} alt='ellipsis' />
      </div>
      <div className={`h-[48px] mx-[4%] mt-[4px] w-[calc(100%-8%)] bg-[#fff] p-[4%] 
                      flex justify-between rounded-[11px] 
                      bg-[linear-gradient(to top, #FFFFFF80 0%, #FFFFFF80 100%)]`} >
                        
        <span className={`text-s text-[#2F2F2F] font-semibold invisible`}>aa</span>
      </div>
    </div>
  );
};

export default BlankMusicCard;