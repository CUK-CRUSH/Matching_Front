import { NameProps } from "@/type/Common/Name";


const Name = ({name, age, mbti} : NameProps) => {
 
  return (
    <div className={` `} >
      <span className={`font-bold text-[#000] text-[0.625rem] opacity-100 mr-[0.2em]`}>
        {name}
      </span>
      <span className={`text-[#2f2f2f] text-[0.625rem] opacity-40 mr-[0.2em]`}>
        |
      </span>
      <span className={`text-[#2f2f2f] text-[0.625rem] opacity-40 mr-[0.2em]`}>
        {age}
      </span>
      <span className={`text-[#2f2f2f] text-[0.625rem] opacity-40 mr-[0.2em]`}>
        |
      </span>
      <span className={`text-[#2f2f2f] text-[0.625rem] opacity-40 mr-[0.2em]`}>
        {mbti}
      </span>
    </div>
  );
};

export default Name;
