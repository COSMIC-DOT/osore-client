interface DropDownListType {
  id: number;
  icon: JSX.Element;
  text: string;
  handleClick: () => void;
}

function Dropdwon({ dropdownList }: { dropdownList: DropDownListType[] }) {
  return (
    <div className="relative">
      <div className="absolute flex max-h-[250px] w-[160px] flex-col overflow-y-auto rounded-[16px] border border-black bg-white">
        {dropdownList.map((item) => (
          <button
            key={item.id}
            className="flex items-center gap-[8px] px-[20px] py-[12px] text-[14px]"
            type="button"
            onClick={item.handleClick}
          >
            {item.icon}
            {item.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Dropdwon;
