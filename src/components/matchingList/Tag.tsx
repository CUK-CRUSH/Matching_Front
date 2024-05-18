import { TagProps } from "@/type/MatchingList/MatchingList";

const Tag = ({ tag, isDark }: TagProps) => {
  return (
    <div className={`bg-transparent py-[2px] px-[4.5px] border-[1px] 
                    border-${isDark ? '[#F9F9F9]' : '[#252525]'} rounded-[20px] mx-[5px]`}>
      <span className={`font-bold text-${isDark ? '[#f9f9f9]' : '[#252525]'} text-xs`}>{tag}</span>
    </div>
  )
}
// ${isDark ? '[#F9F9F9]' : '[#252525]'}


export default Tag;