interface DropDownListType {
  id: number;
  icon: JSX.Element;
  text: string;
  handleClick: () => void;
}

function Dropdwon({ dropdwonList }: { dropdwonList: DropDownListType[] }) {
  return (
    <div className="relative">
      <div className="absolute flex w-[160px] flex-col rounded-[16px] border border-black bg-white">
        {dropdwonList.map((item) => (
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
