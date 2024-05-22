import { TagProps } from "@/type/MatchingList/MatchingList";

const Tag = ({ tag, isDark }: TagProps) => {
  return (
    <div className={`w-auto h-[18px] bg-transparent px-[9px] border-[1px] mb-[4px] 
                ${isDark ? 'border-[#F9F9F9]' : 'border-[#252525]'} rounded-[20px] mx-[5px] 
                flex items-center justify-center`} >
      <span className={`font-bold ${isDark ? 'text-[#f9f9f9]' : 'text-[#252525]'} text-xs`}>{tag}</span>
    </div>
  )
}

export default Tag;