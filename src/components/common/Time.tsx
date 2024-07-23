import { TimeProps } from "@/type/Common/Time";
import FormatTimeAgo from "@/utils/FormatTimeAgo";

const Time = ({ date }: TimeProps) => {
  return (
    <p className={`text-s text-[#858585] `}>
      {FormatTimeAgo(date)}
    </p>
  )
}

export default Time;