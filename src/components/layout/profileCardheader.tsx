import useProfileCardStore from "@/store/profileCardStore";

const ProfileCardHeader = () => { 
  const {coin} = useProfileCardStore();

  return (
    <header className="max-w-[430px] mx-auto h-[60px] bg-white z-50 flex justify-between items-center px-4">
      <div>
        로고
      </div>
      
      <div data-testid='currency'>
        재화 {coin}개 
      </div>
    </header>
  );
};

export default ProfileCardHeader;
