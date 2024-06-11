import { ContainerProps } from "@/type/ProfileCard/ProfileCard";

const MusicCardContainer = ({ children }: ContainerProps) => {
  
  return (
    <div className="h-[150px]">
      
      {children}
    </div>
  );
};

export default MusicCardContainer;
