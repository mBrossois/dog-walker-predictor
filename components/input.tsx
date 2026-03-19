import { CitiesSuggestions, SuggestionResponse } from "@/app/types/city-suggestions"
import { Dispatch, SetStateAction, useState } from "react"

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

    const [isOpen, setIsOpen] = useState(false)
    const [hasFocus, setHasFocus] = useState(false)

    function closeDialog() {
        setHasFocus(false)
        setIsOpen(false)
    }

    if(suggestions.length >= 3 && !isOpen && hasFocus) {
        setIsOpen(true)
    }
    else if(suggestions.length < 3 && isOpen) setIsOpen(false)

    return (
        <div className="relative w-fit flex flex-col gap-2">
            <label htmlFor={name}>{label}</label>
            <div className={`p-[2px] w-fit overflow-hidden relative rounded-md
                after:bg-conic-0 ${hasAnimation ? `after:animate-spin-slow after:from-purple-300 after:to-violet-700 dark:after:from-purple-500 dark:after:to-violet-400` : `after:from-purple-900 after:to-purple-950 dark:after:from-purple-200 dark:after:to-violet-100`}
                after:absolute after:w-60 after:h-60 after:left-[50%] after:top-[50%] after:-translate-[50%] after:z-10`}>
                <input className="relative bg-white dark:bg-black p-2 rounded-md outline-none z-1000" 
                    autoComplete="off"
                    name={name} 
                    id={name} 
                    placeholder={placeholder} 
                    value={value}
                    onClick={() => setHasFocus(true)}
                    onChange={(e) => onChange(e.target.value)} />
            </div>
            <dialog 
                open={isOpen} 
                closedby="any"
                onClose={() => closeDialog()}
                className=" flex-col top-[100%] w-full rounded-md z-10000 overflow-hidden open:flex not-open:none">
                {suggestions.map((suggestion, index) => 
                    <button 
                        key={index}
                        onClick={() => onSuggestionClick({location: `${suggestion.city}, ${suggestion.country}`, long: suggestion.long, latt: suggestion.latt})}
                        className="p-2 border-b-1 cursor-pointer
                            bg-violet-400 text-white
                            dark:bg-white dark:text-violet-800 dark:border-violet-900
                            hover:bg-violet-900
                            dark:hover:bg-violet-800 dark:hover:text-white"
                        >
                        <p className="text-left">{suggestion.city}, {suggestion.country}</p>
                    </button>)}
            </dialog>
        </div>
    )
}