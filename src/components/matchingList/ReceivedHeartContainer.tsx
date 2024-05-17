import { HeartContainerProps } from "@/type/MatchingList/MatchingList"

const ReceivedHeartContainer = ({ children }: HeartContainerProps) => {
  return (
    <div className={`h-[330px] mt-[12px] mb-[26px]`}>
      {children}
    </div>
  )
}

export default ReceivedHeartContainer