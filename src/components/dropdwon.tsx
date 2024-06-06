interface DropDownListType {
  id: number;
  icon: JSX.Element;
  text: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function Dropdwon({ dropdownList }: { dropdownList: DropDownListType[] }) {
  return (
    <div className="relative">
      <div className="absolute flex max-h-[250px] w-[160px] flex-col overflow-y-auto rounded-[16px] border border-black bg-white">
        {dropdownList.map((item) => (
          <button
            key={item.id}
            className="flex items-center gap-[8px] px-[20px] py-[12px]"
            type="button"
            onClick={item.handleClick}
          >
            {item.icon}
            <div className="w-[120px] truncate text-left">{item.text}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Dropdwon;
