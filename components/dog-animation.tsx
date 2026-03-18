import { useEffect } from "react";
import Image from "next/image";
import { Item } from "@/app/types/item";

const dogClass = 'dog-frame absolute bottom-4 left-1/2 -translate-x-1/2'
const invisibleDogClass = `${dogClass} invisible`

const dogSize = 340

interface DogAnimationProps {
    showItem?: Item
}
export default function DogAnimation({showItem}: DogAnimationProps) {
    useEffect(() => {
        let animationFrameId: number;
        let idleSeqTicks = 0;
        let idleSeqIdx = 0;
        const IDLE_SEQUENCE = [
            { frame: 'idle_normal', ticks: 10 },
            { frame: 'idle_tongue', ticks: 10 },
            { frame: 'eyes_closed', ticks: 10 },
            { frame: 'eyes_closed_tongue', ticks: 10 },
        ];

        function hideFrame(frame: string) {
            document.getElementById(`frame-${frame}`)?.classList.add('invisible');
        }

        function showFrame(frame: string) {
            document.getElementById(`frame-${frame}`)?.classList.remove('invisible');
        }

        let lastTime = 0;

        function tick(now: number) {
            animationFrameId = requestAnimationFrame(tick);
            if (now - lastTime < 100) return;
            lastTime = now;

            if (++idleSeqTicks >= IDLE_SEQUENCE[idleSeqIdx].ticks) {
            idleSeqTicks = 0;
            hideFrame(IDLE_SEQUENCE[idleSeqIdx].frame);
            idleSeqIdx = (idleSeqIdx + 1) % IDLE_SEQUENCE.length;
            showFrame(IDLE_SEQUENCE[idleSeqIdx].frame);
            }
        }

        animationFrameId = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(animationFrameId);
    }, []); // runs once on mount, cleans up on unmount

    function showDog() {
    
        return (
            <div className="w-full h-full min-h-100">
                <div className={dogClass} id="frame-idle_normal"><Image width={dogSize} height={dogSize} src="/dog/Dog-no-tongue.svg" alt="Dog no tongue" draggable="false" /></div>
                <div className={invisibleDogClass} id="frame-idle_tongue"><Image width={dogSize} height={dogSize} src="/dog/Dog-with-tongue.svg" alt="Dog with tongue" draggable="false" /></div>
                <div className={invisibleDogClass} id="frame-eyes_closed"><Image width={dogSize} height={dogSize} src="/dog/Dog-eyes-closed-no-tongue.svg" alt="Dog eyes closed no tongue" draggable="false" /></div>
                <div className={invisibleDogClass} id="frame-eyes_closed_tongue"><Image width={dogSize} height={dogSize} src="/dog/Dog-eyes-closed-tongue.svg" alt="Dog eyes closed tongue" draggable="false" /></div>
            </div>
        )
    }

    function toggleDogClass(accessory: Item) {
        return accessory === showItem ? dogClass : invisibleDogClass
    }

    function showAccessory() {
        return (
            <>
                <div className={toggleDogClass(Item.sunglasses)}><Image width={dogSize} height={dogSize} src="/dog/Dog-with-sunglasses.svg" alt="Dog no tongue" draggable="false" /></div>
                <div className={toggleDogClass(Item.umbrella)}><Image width={dogSize} height={dogSize} src="/dog/Dog-with-umbrella.svg" alt="Dog no tongue" draggable="false" /></div>
                <div className={toggleDogClass(Item.beanie)}><Image width={dogSize} height={dogSize} src="/dog/Dog-with-beanie.svg" alt="Dog no tongue" draggable="false" /></div>
            </> 
        )
    }

    return (
        <>
            { showDog() }
            { showAccessory() }
        </>
    )
}