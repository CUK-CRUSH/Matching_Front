import { ContainerProps } from "@/type/ProfileCard/ProfileCard";

const MusicCardContainer = ({ children,isOpen }: ContainerProps) => {
  
  return (
    <div className={`${isOpen ? 'h-[178px]' : 'h-[150px]'}`}>
      {children}
    </div>
  );
};

export default MusicCardContainer;  
