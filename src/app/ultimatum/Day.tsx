"use client"

import React, {useContext, useState} from 'react';
import {dayNumToDateLocal} from "@/util/constants";
import {PanelContext} from "@/context/PanelContext";

type DayProps = {
    className: string,
    indexDay: number,
    dayActivities: any,
    activityTypes: any
}

function getStyle(index: string) {
    let position: any;

    switch (index) {
        case 'p_1':
            position = { bottom: 0, left: 0};
            break;
        case 'p_2':
            position = { top: "1.5rem", left: "-0.5rem"};
            break;
        case 'p_3':
            position = { top: 0, left: 0};
            break;
        case 'p_4':
            position = { top: "-0.5rem", left: "1.6rem"};
            break;
        case 'p_5':
            position = { top: 0, right: 0};
            break;
        case 'p_6':
            position = { top: "1.5rem", right: "-0.5rem"};
            break;
        case 'p_7':
            position = { bottom: 0, right: 0};
            break;
        default:
            position = { bottom: 0, left: 0};
    }

    return position;
}

export const Day = (
    {
        className,
        indexDay,
        dayActivities,
        activityTypes
    }: DayProps) => {
    const [actT] = useState(activityTypes);

    const activityTypesLength = actT.length
    const {setCurrentDay, setShow} = useContext(PanelContext);
    const dayText = dayNumToDateLocal(indexDay);
    const longPressEvent = () => {
        setCurrentDay(indexDay);
        setShow(true);
    }

    let activitiesCompleted : any = 0;
    let activityCircle = <div></div>;


    if(isNaN(dayActivities)) {
        activitiesCompleted = dayActivities[indexDay];

        activityCircle = activitiesCompleted.map((dA: number) => {
            return actT.map((aT: any, indexAT: number) => {
                let position : any = getStyle(`p_${dA}`);

                if(dA === aT.id) {
                    return <div
                        key={indexAT}
                        className={`w-3 h-3 
                            rounded-full 
                            absolute 
                            z-10
                            border border-white
                            ${aT.bg_color}
                            `}
                        style={position}
                    ></div>
                }else {
                    return null
                }

            }).filter((item : any) => !!item);
        })
        activitiesCompleted = activitiesCompleted.length || 0;
    }

    return (<div className="w-16 h-16 flex justify-center items-center
        relative m-2">
        {activityCircle}
        <div
            onClick={longPressEvent}
            title={`${dayText}`}
            className={`
                relative
                w-16 h-16
                rounded-full
                flex 
                flex-col
                justify-center 
                items-center
                text-white
                ${className}
           `}
        >
            <div className="text-lg">{indexDay}</div>
            <div className="text-xs">
                {`${Math.ceil(activitiesCompleted * 100 /activityTypesLength)}%`}
            </div>
        </div>

    </div>)
}

