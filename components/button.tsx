interface Props {
    label: string,
    hasAnimation: boolean
}

export default function Button({
    label,
    hasAnimation
}: Props) {
    return (
        <div className={`
            w-fit rounded-md p-[2px] relative overflow-hidden z-1000 after:rounded-full
            after:bg-conic-0 ${hasAnimation ? `after:animate-spin-slow after:from-purple-500 after:to-violet-400` : `after:from-purple-200 after:to-violet-100`}
            after:absolute after:w-50 after:h-50 after:left-[50%] after:top-[50%] after:-translate-[50%] after:z-10
        `}>
            <button type="submit" className="p-2 bg-indigo-700 min-w-40 rounded-md cursor-pointer relative z-1000 hover:bg-indigo-100 hover:text-indigo-700 transition-all duration-300"
            >{label}</button>
        </div>
    )
}