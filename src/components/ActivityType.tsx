"use client";

import React, {useContext} from "react";
import {PanelContext} from "@/context/PanelContext";
import {setActivityDayRequest} from "@/apiRequests/activityRequest";
import { useRouter } from 'next/navigation';


export default function ActivityType({type}: any) {
    const router = useRouter();
    const {currentDay, activityPerDay, setShow, setLoading} = useContext(PanelContext);


    const onClickActivity = async (activityType: any) => {
        setLoading(true);
        await setActivityDayRequest({
            day: `${currentDay}`,
            activityTypeId: `${activityType.id}`
        });
        setLoading(false);
        router.refresh();
        setShow(false);
        setTimeout(() => {setShow(true)}, 1);
    }

    return (
        <div
            className="flex flex-col mx-8"
            onClick={async () => {
                await onClickActivity(type);
            }}
        >
            <div>{type.name}</div>
            <div className={`
                rounded-full 
                h-16 
                w-16 
                border 
                flex justify-center items-center ${type.bg_color}
            `}>
                {activityPerDay.map((day, index) => {

                    return day.day_num === currentDay && day.activity_type_id === type.id ?
                        <svg
                            key={index}
                            xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 24 24"
                             fill="currentColor"
                             className="text-pink-700">
                            <path fillRule="evenodd"
                                  d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                        </svg>

                        : ''
                })}
            </div>
        </div>
    )
}