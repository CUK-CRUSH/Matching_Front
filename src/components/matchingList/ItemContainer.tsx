import { ItemContainerProps } from "@/type/MatchingList/MatchingList"

const ItemContainer = ({ children }: ItemContainerProps) => {
  return (
    <div className={`h-auto mt-[12px] mb-[26px]`}>
      {children}
    </div>
  )
}

export default ItemContainer