import { Dispatch, SetStateAction } from "react";

interface Options {
  value: string | number,
  label: string
}

interface Dropdown {
  name: string,
  label: string,
  placeholder: string,
  options: Array<Options>,
  selected: string,
  hasAnimation: boolean,
  onSetSelected: Dispatch<SetStateAction<string>>
}

export default function Dropdown({
    options, 
    name,
    placeholder,
    label,
    selected,
    hasAnimation,
    onSetSelected
}: Dropdown) {
  
  return (
    <div className="flex flex-col gap-2">
        <label htmlFor={name}>{label}</label>
        <div className={`w-fit rounded-md p-[1px] relative overflow-hidden z-1000 after:rounded-full
          after:bg-conic-0 ${hasAnimation ? `after:animate-spin-slow after:from-purple-500 after:to-violet-400` : `after:from-purple-200 after:to-violet-100`}
          after:absolute after:w-50 after:h-50 after:left-[50%] after:top-[50%] after:-translate-[50%] after:z-10`}>
          <select 
            defaultValue={selected} 
            onChange={e => onSetSelected(e.target.value)} 
            name={name} 
            id={name} 
            aria-label={label}
            className="dropdown relative z-100 outline-none
              p-2 bg-indigo-700 text-fuchsia-50 rounded-md
              dark:bg-indigo-800 dark:text-indigo-100">
            <option value="" disabled>{placeholder}</option>  
            {options.map(option => 
              <option value={option.value} key={option.value}>{option.label}</option>
            )}
          </select>
        </div>
    </div>
  );
}