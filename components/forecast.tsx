"use client"

import { Item } from "@/app/types/item";
import { Time } from "@/app/types/time";
import DogAnimation from "@/components/dog-animation";

interface Forecast {
    forecast?: Time | 'No data'
}

export default function Forecast({
    forecast
}: Forecast ) {

    function getTimeToWalk() {
        if(!forecast) {
        return 'Something went wrong'
        }

        if(forecast === 'No data') {
        return 'Something went wrong'
        }

        const now = new Date().getTime()
        const bestTimeDate = new Date(forecast.time)

        if(bestTimeDate.getTime() <= now) {
            return 'now'
        }
        
        return `at ${bestTimeDate.getHours()}:${bestTimeDate.getMinutes()}`
    }

    function displayForecast() {
        return (
            <>
                <span>You should go <strong>{getTimeToWalk()}</strong></span>
            </>
        )
    }

    function showItem() {
        if(!forecast || forecast === 'No data') {
            return undefined
        }

        if(forecast.snow >= 1) {
            return Item.beanie
        }

        if(forecast.rain >= 2) {
            return Item.umbrella
        }

        if(forecast.sunshine >= 700) {
            return Item.sunglasses
        }
    }
    

    return (
        <div className="relative w-full h-104 p-4 border-2 border-black dark:border-white border-dashed rounded-xl">
            <p className="text-3xl text-center pt-4">    
                {
                    forecast ? 
                        displayForecast()
                        : null
                }
            </p>
            <DogAnimation showItem={showItem()}/>
        </div>
    )
} 