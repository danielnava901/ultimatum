"use client"

import React, {useContext} from 'react';
import {dayNumToDateLocal} from "@/util/constants";
import {PanelContext} from "@/context/PanelContext";

export const Day = (
    {
        className,
        indexDay,
        dayActivities,
        activityTypes
    }) => {
    const activityTypesLength = activityTypes.length
    const {setCurrentDay, setShow, currentDay} = useContext(PanelContext);
    const dayText = dayNumToDateLocal(indexDay);
    const longPressEvent = () => {
        setCurrentDay(indexDay);
        setShow(true);
    }

    let activitiesCompleted = 0;
    let activityCircle = <div></div>;

    let positions = {
        "1": { bottom: 0, left: 0},
        "2": { top: "1.5rem", left: "-0.5rem"},
        "3": { top: 0, left: 0},
        "4": { top: "-0.5rem", left: "1.6rem"},
        "5": { top: 0, right: 0},
        "6": { top: "1.5rem", right: "-0.5rem"},
        "7": { bottom: 0, right: 0}
    }

    if(dayActivities !== 0) {
        activitiesCompleted = dayActivities.get(indexDay)
        activityCircle = activitiesCompleted.map(dA => {
            return activityTypes.map((aT, indexAT) => {
                let position : any = positions[`${dA}`];

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
                    return <div
                        key={indexAT}
                        className={`w-1 h-1 rounded-full absolute opacity-0`}
                        style={position}
                    ></div>
                }

            });
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

