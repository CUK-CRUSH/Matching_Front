import { forwardRef } from 'react';
import { ItemContainerProps } from "@/type/MatchingList/MatchingList";

const ItemContainer = forwardRef<HTMLDivElement, ItemContainerProps>(({ children }, ref) => {
  return (
    <div 
      ref={ref}
      className={`h-auto mt-[12px] mb-[26px] `}>
      
      <div >
        {children}
      </div>
    </div>
  );
});

export default ItemContainer;
