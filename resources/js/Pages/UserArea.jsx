import Cookies from "js-cookie"
import Preferences from "@/Components/UserArea/Preferences"
import { motion } from "framer-motion"
import WhiteCard from "@/Components/Commons/WhiteCard"
import CardUser from "@/Components/Commons/CardUser"
import { useContext } from "react"
import { UserContext } from "@/Layouts/UserLayout"
import { useState } from "react"
import Profile from "@/Components/UserArea/Profile"
import DarkButton from "@/Components/Commons/DarkButton"
import PermissionPrivacy from "@/Components/UserArea/PermissionPrivacy"

const token = Cookies.get("auth-token")

export default function UserArea({}) {
    const user = useContext(UserContext)
    const [tab, setTab] = useState(0)
    const arrayTab = [
        <Profile/>,
        <div />,
        <div />,
        <PermissionPrivacy />
    ]
    

    return (
        <div className="flex flex-col min-h-fit size-full p-1 gap-2">
            <div className="w-full flex justify-between text-center text-2xl px-2 py-1">
                <div />
                <h1 className="dark:text-white">
                    User Area
                </h1>
                <DarkButton />
            </div>
            <WhiteCard className="h-full gap-2">
                <div className="flex flex-col w-1/6 h-f:ull p-2">
                    <div className={"w-full text-xl p-3 rounded dark:bg-neutral-800 dark:text-white " + (tab==0 && " bg-slate-200 dark:bg-neutral-700 ")}
                        style={{cursor: "pointer"}}
                        onClick={()=>{tab!=0 && setTab(0)}}
                    >Profile</div>
                    <div className={"w-full text-xl p-3 rounded  dark:bg-neutral-800 dark:text-white " + (tab==1 && " bg-slate-200 dark:bg-neutral-700") }
                        onClick={()=>{tab!=1 && setTab(1)}}
                        style={{cursor: "pointer"}}
                    >Notification</div>
                    <div className={"w-full text-xl p-3 rounded  dark:bg-neutral-800 dark:text-white " + (tab==2 && " bg-slate-200 dark:bg-neutral-700")}
                        onClick={()=>{tab!=2 && setTab(2)}}
                        style={{cursor: "pointer"}}
                    >History</div>
                    <div className={"w-full text-xl p-3 rounded  dark:bg-neutral-800 dark:text-white " + (tab==3 && " bg-slate-200 dark:bg-neutral-700")}
                        style={{cursor: "pointer"}}
                        onClick={()=>{tab!=3 && setTab(3)}}
                    >Privacy</div>
                </div>
                <div className="flex h-75 w-px bg-slate-100 dark:bg-neutral-600 my-5">
                </div>
                <div className="flex size-full">
                    { arrayTab[tab]}
                </div>

            </WhiteCard>
        </div>
    )
}