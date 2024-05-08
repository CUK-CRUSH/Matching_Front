import { Textarea } from "@/components/ui/textarea";

const ProfileCardIntroduction = () => {

  const profileCardIntroductionStyle = `w-[90%] mx-[5%] mb-[20px] `;
  const CoupleMusicStyle = `text-[#2F2F2F] text-[0.5rem] ml-[4%] font-bold my-[8px]`;

  return (
    <div className={profileCardIntroductionStyle} >
      <p data-testid='introduction' className={CoupleMusicStyle}>
        스스로를 소개해주세요
      </p>
      <Textarea 
        className="text-[0.5rem] text-[#2F2F2F] "
        value={'길게 쓰는 자기소개'}/>
    </div>
  );
};

export default ProfileCardIntroduction;
