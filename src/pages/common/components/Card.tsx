type Props = {
  checked: boolean;
  content: string;
  icon?: string;
  isGender?: boolean;
};

export default function Card({ checked, content, icon, isGender = false }: Props) {
  return (
    <div
      className={`${isGender ? 'px-20' : 'px-10'} py-5 ${checked ? 'bg-white border-gray-400' : 'bg-gray-200'} border-[1px] rounded-xl cursor-pointer whitespace-nowrap`}
    >
      <div className="flex justify-center items-center gap-2">
        {icon && <img src={icon} width={24} height={24} />}
        <p className="font-xl">{content}</p>
      </div>
    </div>
  );
}
