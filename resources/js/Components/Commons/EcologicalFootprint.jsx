import { useState, useEffect } from "react";
import { CiUser, CiPizza } from "react-icons/ci";
import { FaCarSide } from "react-icons/fa";
import { LuSmartphoneCharging } from "react-icons/lu";
import { animate, motion, useMotionValue, useTransform } from "framer-motion"

export function EcologicalFootprint({ energyConsumptionIn }) {
    const [gCO2, setGCO2] = useState(0)
    const averageGCO2 = 50000
    const gCO2PerKwh = 431.14
    const gCO2PerPizza = 5000
    const gCO2PerKm = 161.9
    const kWhPerPhoneCharge = 0.01
    const [averageBarWidth, setAverageBarWidth] = useState(50)
    const [yourBarWidth, setYourBarWidth] = useState(50)

    const countKm = useMotionValue(0)
    const countPizza = useMotionValue(0)
    const countCharge = useMotionValue(0)

    const roundedKm = useTransform(countKm, latest => Math.round(latest) + " km")
    const roundedPizza = useTransform(countPizza, latest => Math.round(latest) + " Margheritas")
    const roundedCharge = useTransform(countCharge, latest => Math.round(latest) + " times")
    
    const animationProp = {
        duration: 0.7,
        delay: 0.5
    }

    useEffect(() => {
        setGCO2(energyConsumptionIn * gCO2PerKwh)

    }, [energyConsumptionIn])

    useEffect(() => {
        if (gCO2 > averageGCO2) {
            setAverageBarWidth(Math.round(50 * (averageGCO2 / gCO2)))
            setYourBarWidth(50)
        } else {
            setAverageBarWidth(50)
            setYourBarWidth(Math.round(50 * (gCO2 / averageGCO2)))
        }
    }, [gCO2])

    useEffect(()=>{
        const controlsKm = animate(countKm, Math.round(gCO2/gCO2PerKm), animationProp)
        const controlsPizza = animate(countPizza, Math.round(gCO2/gCO2PerPizza),animationProp)
        const controlsCharge = animate(countCharge, Math.round(energyConsumptionIn/kWhPerPhoneCharge),animationProp )
        return () => {
            controlsKm.stop()
            controlsPizza.stop()
            controlsCharge.stop()
        }
    },[gCO2])

    return (
        <div className="w-full h-full rounded-lg items-center flex flex-col gap-3 text-gray-800 p-4 dark:text-white">
            <div className="w-full flex justify-center">
                <h1 className="uppercase font-bold text-3xl">Your <span className="text-lime-600 dark:text-lime-400  underline underline-offset-1">Ecological</span> footprint</h1>
            </div>
            <div className="w-full flex flex-col">
                {gCO2 < averageGCO2 ? 
                    <p className="text-base"> The past month your actions produced <span className="font-bold">{Math.round(gCO2 / 1000)} kg of CO2e</span>.
                    Congratulations your emissions were <span className="font-bold text-lime-600 dark:text-lime-400">{Math.round((1 - gCO2 / averageGCO2) * 100)}% less</span> than the average person!
                    </p>
                    :
                    <p className="text-base"> The past month your actions produced <span className="font-bold">{Math.round(gCO2 / 1000)} kg of CO2e</span>.
                    Congratulations your emissions were <span className="font-bold text-red-400">{Math.round((gCO2 / averageGCO2 - 1) * 100)}% more</span> than the average person!
                    </p>
                }

            </div>
            <div className="flex flex-col size-full justify-center gap-3">
                <div className="flex flex-row gap-2 w-full 2xl:pl-24">
                    <CiUser className="size-9" />
                    <p className="w-24">Average user</p>
                    <motion.div className="bg-green-800 h-5 rounded-tr rounded-br"
                        initial={{ width: "0px" }}
                        animate={{ width: averageBarWidth + "%" }}
                        transition={animationProp}
                    />
                    <p>{Math.round(averageGCO2 / 1000)} kgCO2e</p>
                </div>
                <div className="flex flex-row gap-2 w-full 2xl:pl-24">
                    <CiUser className="size-9" />
                    <p className="w-24">You</p>
                    <motion.div className="bg-lime-400 h-5 rounded-tr rounded-br"
                        initial={{ width: "0px" }}
                        animate={{ width: yourBarWidth + "%" }}
                        transition={animationProp}
                    />
                    <p>{Math.round(gCO2 / 1000)} kgCO2e</p>
                </div>
            </div>
            <div>
                <p>You produced as much CO2 as:</p>
            </div>
            <div className="flex size-full grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center">
                    <FaCarSide className="size-16" />
                    <p>Driving a car for </p>
                    <motion.div className="font-bold text-lime-600 dark:text-lime-400 underline">{roundedKm}</motion.div>
                </div>
                <div className="flex flex-col items-center">
                    <CiPizza className="size-16" />
                    <p>Eating <motion.span className="font-bold text-lime-600 dark:text-lime-400 underline">{roundedPizza}</motion.span> <br /> at the pizzeria</p>
                </div>
                <div className="flex flex-col items-center">
                    <LuSmartphoneCharging className="size-16" />
                    <p>Charging an average <br /> smartphone <motion.span className="font-bold text-lime-600 dark:text-lime-400 underline">{roundedCharge}</motion.span></p>
                </div>
            </div>
        </div>
    )
}