'use client'
import Dropdown from "@/components/dropdown";
import Input from "@/components/input";
import { type SetStateAction, useState } from "react";

const dayDropdown = [
  {value: 1, label: 'Next 1 hour'},
  {value: 2, label: 'Next 2 hour'},
  {value: 3, label: 'Next 3 hour'},
  {value: 4, label: 'Next 4 hour'},
  {value: 5, label: 'Next 5 hour'},
  {value: 6, label: 'Next 6 hour'}
]

const durationDropdown = [
  {value: 15, label: '15 minutes'},
  {value: 30, label: '30 minutes'},
  {value: 60, label: '1 hour'},
]

export default function Home() {
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [location, setLocation] = useState('')
  const animation = getAnimationState();

  function getAnimationState() {
    if(!location) return 'location'
    if(selectedTime === '') return 'time'
    if(selectedDuration === '') return 'duration'
    return ''
  }

  function updateEvent(variant: 'time' | 'duration' | 'location', value: SetStateAction<string>) {
    if(variant === 'location') {
      setLocation(value)
    }
    
    if(variant === 'time') {
      setSelectedTime(value)
    }

    if(variant === 'duration') {
      setSelectedDuration(value)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center gap-8 py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Input 
          label="Where do you live?" 
          placeholder="Fill in your location" 
          name="city" 
          hasAnimation={animation === 'location'} 
          value={location} 
          onChange={location => updateEvent('location', location)} />
        <Dropdown 
          name="day-selector" 
          placeholder="Select a time range" 
          label="When do you want to walk your dog?" 
          options={dayDropdown}
          hasAnimation={animation === 'time'}
          selected={selectedTime}
          onSetSelected={value => updateEvent('time', value)}
          ></Dropdown>

        <Dropdown 
          name="duration-selector" 
          placeholder="Select a duration" 
          label="What amount of time do you walk your dog?" 
          options={durationDropdown}
          hasAnimation={animation === 'duration'}
          selected={selectedDuration}
          onSetSelected={value => updateEvent('duration', value)}
          ></Dropdown>
      </main>
    </div>
  );
}
