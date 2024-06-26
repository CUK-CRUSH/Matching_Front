import { ExpandedButtonsProps } from "@/type/MatchingList/MatchingList"
import { Link } from "react-router-dom"

const ExpandedButtons = ({state, router} : ExpandedButtonsProps) => {

  return (
      <div className="flex justify-between px-[5%] mt-[24px] ">
        <p className="text-[#F8F8F8] font-bold text-[12px]">
          {state}
        </p>
        <p className="text-[#F8F8F8] font-bold text-[12px]">
          <Link to={router}>
            더보기 &gt;
          </Link>
        </p>
      </div>
    )
}

export default ExpandedButtons;