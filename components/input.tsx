import { CitiesSuggestions, SuggestionResponse } from "@/app/types/city-suggestions"
import { Dispatch, SetStateAction } from "react"

interface Props {
    name: string,
    label: string,
    placeholder: string,
    hasAnimation: boolean,
    value?: string,
    suggestions: CitiesSuggestions[],
    onChange: Dispatch<SetStateAction<string>>
    onSuggestionClick: Dispatch<SetStateAction<SuggestionResponse>>
}

export default function Input({
    name,
    label,
    placeholder,
    hasAnimation,
    value,
    suggestions,
    onChange,
    onSuggestionClick
}: Props) {

    return (
        <div className="relative w-fit flex flex-col gap-2">
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
            <dialog 
                open={suggestions.length > 0} 
                className="flex flex-col top-[100%] w-full rounded-md z-10000 overflow-hidden">
                {suggestions.map((suggestion, index) => 
                    <button 
                        key={index}
                        onClick={() => onSuggestionClick({location: `${suggestion.city}, ${suggestion.country}`, long: suggestion.long, lang: suggestion.lang})}
                        className="p-2 text-violet-800 border-b-1 border-violet-900 cursor-pointer
                            hover:bg-violet-800 hover:text-white"
                        >
                        <p className="text-left">{suggestion.city}, {suggestion.country}</p>
                    </button>)}
            </dialog>
        </div>
    )
    
}