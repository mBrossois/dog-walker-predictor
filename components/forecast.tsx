import { Time } from "@/app/types/time";
import Image from "next/image";

interface Forecast {
    forecast?: Time | 'No data'
}

const dogClass = 'dog-frame absolute bottom-0 left-1/2 -translate-x-1/2'
const invisibleDogClass = `${dogClass} invisible`

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
                <p>You should go {getTimeToWalk()}</p>
            </>
        )
    }

    function timer() {
        let idleSeqTicks = 0;
        let idleSeqIdx = 0;
        const IDLE_SEQUENCE = [
            { frame: 'idle_normal', ticks: 10 },
            { frame: 'idle_tongue', ticks: 10 },
            { frame: 'eyes_closed', ticks: 10 },
            { frame: 'eyes_closed_tongue', ticks: 10 },
        ];


        function hideFrame(frame: string) {
            const frameElement = document.getElementById(`frame-${frame}`);
            if (frameElement) {
                frameElement.classList.add('invisible');
            }
        }

        function showFrame(frame: string) {
            const frameElement = document.getElementById(`frame-${frame}`);
            if (frameElement) {
                frameElement.classList.remove('invisible');
            }
        }

        let lastTime = 0;
        
        requestAnimationFrame(function tick(now) {
            requestAnimationFrame(tick);
            if (now - lastTime < 100) return;
                lastTime = now;
                
                if (++idleSeqTicks >= IDLE_SEQUENCE[idleSeqIdx].ticks) {
                    idleSeqTicks = 0;
                    hideFrame(IDLE_SEQUENCE[idleSeqIdx].frame);
                    idleSeqIdx = (idleSeqIdx + 1) % IDLE_SEQUENCE.length;
                    showFrame(IDLE_SEQUENCE[idleSeqIdx].frame);
                }
          });
    };

    function showDog() {
    
        return (
            <div className="w-full h-full min-h-100">
                <div className={dogClass} id="frame-idle_normal"><Image width={100} height={100} src="/dog/Dog-no-tongue.svg" alt="Dog no tongue" draggable="false" /></div>
                <div className={invisibleDogClass} id="frame-idle_tongue"><Image width={100} height={100} src="/dog/Dog-with-tongue.svg" alt="Dog with tongue" draggable="false" /></div>
                <div className={invisibleDogClass} id="frame-eyes_closed"><Image width={100} height={100} src="/dog/Dog-eyes-closed-no-tongue.svg" alt="Dog eyes closed no tongue" draggable="false" /></div>
                <div className={invisibleDogClass} id="frame-eyes_closed_tongue"><Image width={100} height={100} src="/dog/Dog-eyes-closed-tongue.svg" alt="Dog eyes closed tongue" draggable="false" /></div>
            </div>
        )
    }

    timer();

    return (<div className="relative w-full h-full p-4 border-2 border-white border-dashed rounded-xl">
        {
            forecast ? 
                displayForecast()
                : null
        }
        { showDog() }
    </div>)
} 