import { TimeProps } from "@/type/Common/Time";

const Time = ({ time }: TimeProps) => {
  return (
    <p className={`text-s text-[#858585] `}>{time}</p>
  )
}

export default Time;