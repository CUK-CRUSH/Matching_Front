import { OneLineIntroductionProps } from "@/type/ProfileCard/ProfileCard";

const Comment = ({oneLineIntroduction} : OneLineIntroductionProps) => {

  return (
    <div className={`w-[90%] mb-[4px]`} >
      <p className={`font-bold text-[#474747] text-s `}>
      {oneLineIntroduction}
      </p>
    </div>
  );
};

export default Comment;
