"use client"

import React, {useContext, useEffect, useRef, useState} from 'react';
import {PanelContext} from "@/context/PanelContext";
import {dayNumToDate} from "@/util/constants";
import ActivityType from "@/app/ultimatum/ActivityType";
import {getActivityTypesRequest} from "@/apiRequests/activityRequest";

export const Panel : React.FC = () => {
    const {show, setShow, currentDay, setLoading} = useContext(PanelContext);
    const [day, setDay] = useState('');
    const panelRef = useRef(null);
    const [activityTypes, setActivityTypes] = useState([]);

    const getActivityTypes = async () => {
        setLoading(true);
        let data = await getActivityTypesRequest();
        setActivityTypes(data);
        setLoading(false);
    }

    useEffect(() => {
        getActivityTypes();
    }, []);

    useEffect(() => {
        if(!isNaN(currentDay)) {
            setDay(dayNumToDate(currentDay).toLocaleDateString());
        }
    }, [show]);

    return <>
        {
            show ? <div className="
            w-screen
            h-screen
            top-0
            right-0
            left-0
            bottom-0
            flex
            justify-center
            items-center
            fixed
            "
            style={{
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                zIndex: 90
            }}
            onClick={() => {
                setShow(false);
            }}
        >
            <div className="
                border
                rounded
                bg-white
                p-4
                w-11/12
                h-6/12
                lg:min-w-[400px]
                lg:min-h-[300px]
                lg:min-w-10/12
                lg:min-h-10/12
                fixed
                text-gray-800
                flex flex-col
                flex-wrap
                relative
            "
                 style={{zIndex: 99}}
                 ref={panelRef}
                 onClick={(ev) => {
                     ev.stopPropagation();
                 }}
            >
                <div className="mb-4">Día: {currentDay} - {day}</div>
                <div className="flex justify-between mb-4 flex flex-wrap mt-4">
                    {
                        activityTypes.map((type: any, index: number) => {
                            return <ActivityType
                                key={type.id}
                                type={type}
                            />
                        })

                    }
                </div>
                <div className="flex justify-end">
                    <ActivityType
                        type={{
                            id: 99,
                            name: "Otro",
                            bg_color: "bg-gray-400"
                        }} />

                </div>
            </div>
        </div> : null
        }
    </>
}

