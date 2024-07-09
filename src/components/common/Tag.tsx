import { TagProps } from "@/type/MatchingList/MatchingList";

const Tag = ({ name,state, isDark, isProfileCard,mark }: TagProps) => {
  return (
    <div className={`inline-block w-auto px-[9px] border-[1px]
                    ${isProfileCard ? 'h-[28px]' : 'h-[18px] '}
                     ${isDark  ? 'border-[#F9F9F9]' : 'border-[#252525]'}
                     ${(state === 'FEATURED' && mark) && 'border-[#252525]'}
                     ${(state === 'FEATURED' && mark) ? 'bg-[#252525]' : 'bg-transparent'}
                     rounded-3xl mr-1 mb-[5px] flex items-center justify-center`}>
      <span className={`font-bold ${isDark || (state === 'FEATURED' && mark) ? 'text-[#f9f9f9]' : 'text-[#252525]'} 
                        ${isProfileCard ? 'text-s' : 'text-xs'}`}>{name}</span>
    </div>
  )
}

export default Tag;