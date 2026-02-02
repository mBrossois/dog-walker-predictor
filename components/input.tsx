import { Dispatch, SetStateAction } from "react"

interface Props {
    name: string,
    label: string,
    placeholder: string,
    hasAnimation: boolean,
    value?: string,
    onChange: Dispatch<SetStateAction<string>>
}

export default function Input({
    name,
    label,
    placeholder,
    hasAnimation,
    value,
    onChange
}: Props) {

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={name}>{label}</label>
            <div className={`p-[2px] w-fit overflow-hidden relative rounded-md
                after:bg-conic-0 ${hasAnimation ? `after:animate-spin-slow after:from-purple-500 after:to-violet-400` : `after:from-purple-200 after:to-violet-100`}
                after:absolute after:w-60 after:h-60 after:left-[50%] after:top-[50%] after:-translate-[50%] after:z-10`}>
                <input className="relative bg-black p-2 rounded-md outline-none z-1000" 
                    autoComplete="off"
                    name={name} 
                    id={name} 
                    placeholder={placeholder} 
                    value={value} 
                    onChange={(e) => onChange(e.target.value)} />
            </div>
        </div>
    )
    
}