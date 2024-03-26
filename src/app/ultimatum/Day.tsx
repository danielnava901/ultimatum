"use client"

import React, {useContext, useState} from 'react';
import {dayNumToDateLocal} from "@/util/constants";
import {PanelContext} from "@/context/PanelContext";
import {getStyle} from "@/util/util";

type DayProps = {
    className: string,
    indexDay: number,
    dayActivities: any,
    activityTypes: any
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
    let notesCompleted : any = 0;
    let activityCircle = <div></div>;


    if(isNaN(dayActivities)) {
        activitiesCompleted = dayActivities[indexDay]["act"];
        notesCompleted = dayActivities[indexDay]["notes"].length;

        activityCircle = activitiesCompleted.map((dA: any) => {
            return actT.map((aT: any, indexAT: number) => {
                let position : any = getStyle(`p_${dA.activity_type_id}`);

                if(dA.activity_type_id === aT.id) {
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
        });
        activitiesCompleted = activitiesCompleted.length || 0;
    }

    return (<div className="w-16 h-16 flex justify-center items-center
        relative m-2 mb-4">
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
        {notesCompleted > 0 ? <div className="absolute text-xs" style={{bottom: "-15px"}}>
            {notesCompleted}</div> : null}
    </div>)
}

