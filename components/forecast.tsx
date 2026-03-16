import { Time } from "@/app/types/time";

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

        const now = new Date().toLocaleTimeString()
        const bestTimeDate = new Date(forecast.time)
        if(bestTimeDate.toLocaleTimeString() <= now) {
            return 'now'
        }
        
        return `at ${bestTimeDate.getHours()}:${bestTimeDate.getMinutes()}`
    }

    return (<div className="w-full h-full p-4 border-2 border-white border-dashed rounded-xl">
        {
            forecast ? 
                <p>You should go {getTimeToWalk()}</p>
                : null
        }

    </div>)
} 