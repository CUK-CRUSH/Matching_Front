import { ReceivedHeartContainerProps } from "@/type/MatchingList/MatchingList"

const ReceivedHeartContainer = ({ children }: ReceivedHeartContainerProps) => {
  return (
    <div className={`h-[330px] mt-[12px] mb-[50px]`}>
      {children}
    </div>
  )
}

export default ReceivedHeartContainer