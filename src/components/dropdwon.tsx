import { LegacyRef } from 'react';

interface DropDownListType {
  id: number;
  icon?: JSX.Element;
  text: string;
  warning?: boolean;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function Dropdwon({
  dropdownList,
  dropdownRef,
  border,
}: {
  dropdownList: DropDownListType[];
  dropdownRef: LegacyRef<HTMLDivElement>;
  border: boolean;
}) {
  return (
    <div className="relative">
      <div
        ref={dropdownRef}
        className={`absolute right-0 z-20 flex max-h-[250px] w-[160px] flex-col overflow-y-auto rounded-[16px] bg-white ${border ? 'border' : 'border-none shadow-[0px_0px_30px_0px_rgba(0,0,0,0.05)]'}`}
      >
        {dropdownList.map((item) => (
          <button
            key={item.id}
            className="flex items-center gap-[8px] rounded-[16px] px-[20px] py-[12px] hover:bg-primary_light"
            type="button"
            onClick={item.handleClick}
          >
            {item.icon || null}
            <div className={`w-[120px] truncate text-left ${item.warning && 'text-error'}`}>{item.text}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Dropdwon;
