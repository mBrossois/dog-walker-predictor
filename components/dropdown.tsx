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
  onSetSelected: Dispatch<SetStateAction<string>>
}

export default function Dropdown({
    options, 
    name,
    placeholder,
    label,
    selected,
    onSetSelected
}: Dropdown) {
  
  return (
    <div className="flex flex-col">
        <label htmlFor={name}>{label}</label>
        <select defaultValue={selected} onChange={e => onSetSelected(e.target.value)} name={name} id={name} className="bg-indigo-700 text-fuchsia-100">
          <option value="" disabled>{placeholder}</option>  
          {options.map(option => 
            <option value={option.value} key={option.value}>{option.label}</option>
          )}
        </select>
    </div>
  );
}
