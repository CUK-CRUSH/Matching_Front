import { TimeProps } from "@/type/Common/Time";
import FormatTimeAgo from "@/utils/FormatTimeAgo";

const Time = ({ messageDate }: TimeProps) => {
  return (
    <p className={`text-s text-[#858585] `}>
      {FormatTimeAgo(messageDate)}
    </p>
  )
}

export default Time;