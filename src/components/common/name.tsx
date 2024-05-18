import { NameProps } from "@/type/Common/Name";


const Name = ({name, age, mbti, isDark} : NameProps) => {
  
  const fontStyle = `text-[${isDark ? '#fff' : '#2f2f2f'}] text-m opacity-40 mr-[0.2em]`

  return (
    <div className={` `} >
      <span className={`font-bold text-[${isDark ? '#fff' : '#000'}] text-m opacity-100 mr-[0.2em]`}>
        {name}
      </span>
      <span className={fontStyle}>
        |
      </span>
      <span className={fontStyle}>
        {age}
      </span>
      <span className={fontStyle}>
        |
      </span>
      <span className={fontStyle}>
        {mbti}
      </span>
    </div>
  );
};

export default Name;
