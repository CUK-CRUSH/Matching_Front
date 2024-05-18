import { HeartContainerProps } from "@/type/MatchingList/MatchingList"

const SendedHeartContainer = ({ children }: HeartContainerProps) => {
  return (
    <div className={`h-auto mt-[12px] mb-[26px]`}>
      {children}
    </div>
  )
}

export default SendedHeartContainer