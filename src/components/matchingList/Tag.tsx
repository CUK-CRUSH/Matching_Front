import { TagProps } from "@/type/MatchingList/MatchingList";

const Tag = ({tag, isDark} : TagProps) => {

  return (
    <div className={`bg-transparent py-[4px] px-[8px] border-[1px] border-[${isDark ? '#fff' : '#252525'}] rounded-3xl mr-[5px]`}>
      <span className={`font-bold text-[${isDark ? '#fff' : '#2F2F2F'}] text-[0.5rem]`}>{tag}</span>
    </div>
  )
}

export default Tag;