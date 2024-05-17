import { ExpandedButtonsProps } from "@/type/MatchingList/MatchingList"
import { Link } from "react-router-dom"

const ExpandedButtons = ({heartState, router} : ExpandedButtonsProps) => {

  return (
      <div className="flex justify-between px-[5%] mt-[7%] ">
        <p className="text-[#F8F8F8] font-bold text-[12px]">
          {heartState}
        </p>
        <p className="text-[#F8F8F8] font-bold text-[12px]">
          <Link to={router}>
            더보기 &gt;
          </Link>
        </p>
      </div>
    )
}

export default ExpandedButtons