'use client'
import Dropdown from "@/components/dropdown";
import { useState } from "react";

const dayDropdown = [
  {value: 1, label: 'Next 1 hour'},
  {value: 2, label: 'Next 2 hour'},
  {value: 3, label: 'Next 3 hour'},
  {value: 4, label: 'Next 4 hour'},
  {value: 5, label: 'Next 5 hour'},
  {value: 6, label: 'Next 6 hour'}
]

export default function Home() {
  const [selected, setSelected] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Dropdown 
          name="day-selector" 
          placeholder="Select a time range" 
          label="In what time range do you want to walk your dog?" 
          options={dayDropdown}
          selected={selected}
          onSetSelected={value => setSelected(value)}
          ></Dropdown>
      </main>
    </div>
  );
}
