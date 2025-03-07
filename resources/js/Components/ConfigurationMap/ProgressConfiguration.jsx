import { FaHouse, FaLightbulb, FaBolt, FaCheck } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { useState } from "react";

export default function ({ state, setState }) {
    const darkMode = localStorage.getItem("darkMode") =="true"
    return (
        <div className="w-10/11 flex justify-start items-center mt-16 py-1 px-4
        rounded bg-white dark:bg-neutral-900 shadow">
                <div className={"rounded-full p-1 size-min border solid bg-lime-400"}
                    onClick={() => setState(0)}
                >
                    <FaHouse size={32}></FaHouse>
                </div>
                <div className={"w-full p-2 mx-2 rounded " + (state > 0 ? "bg-lime-400" : "bg-gray-300 dark:bg-neutral-700")}></div>
                <div className={"rounded-full p-1 size-min border solid " + (state > 0 ? "bg-lime-400" : "bg-gray-300")}
                    onClick={() => setState(1)}
                >
                    <FaLightbulb size={32}></FaLightbulb>
                </div>
                <div className={"w-full p-2 mx-2 rounded " + (state > 1 ? "bg-lime-400" : "bg-gray-300 dark:bg-neutral-700")}></div>
                <div className={"rounded-full p-1 size-min border solid " + (state > 1 ? "bg-lime-400" : "bg-gray-300")}
                    onClick={() => setState(2)}
                >
                    <FaBolt size={32}></FaBolt>
                </div>
                <div className={"w-full p-2 mx-2 rounded " + (state > 2 ? "bg-lime-400" : "bg-gray-300 dark:bg-neutral-700")}></div>
                <div className={"rounded-full p-1 size-min border solid " + (state > 2 ? "bg-lime-400" : "bg-gray-300")}
                    onClick={() => setState(3)}
                >
                    <FaCheck size={32}></FaCheck>
                </div>
        </div>
    )
}