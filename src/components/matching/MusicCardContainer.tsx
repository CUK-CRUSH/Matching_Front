import { ContainerProps } from "@/type/ProfileCard/ProfileCard";

const MusicCardContainer = ({ children }: ContainerProps) => {
  
  return (
    <div className="h-[150px] mb-2">
      {children}
    </div>
  );
};

export default MusicCardContainer;
