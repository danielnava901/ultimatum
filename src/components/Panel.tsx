"use client"

import React, {useContext, useEffect, useRef, useState} from 'react';
import {PanelContext} from "@/context/PanelContext";
import {dayNumToDate} from "@/util/constants";
import ActivityType from "@/components/ActivityType";
import Loading from "@/components/Loading";

export const Panel : React.FC = ({children}) => {
    const [loading, setLoading] = useState(false);
    const {show, setShow, currentDay} = useContext(PanelContext);
    const [day, setDay] = useState('');
    const panelRef = useRef(null);
    const [activityTypes, setActivityTypes] = useState([]);

    const getActivityTypes = async () => {
        let response = await fetch("/api/getActivityTypes", {
            method: "POST"
        });
        let {data: {data}} = await response.json();
        setActivityTypes(data);
    }

    useEffect(() => {
        getActivityTypes();
    }, []);

    useEffect(() => {
        if(!isNaN(currentDay || 0)) {
            setDay(dayNumToDate(currentDay || 0).toLocaleDateString());
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
                        activityTypes.map((type, index) => {
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

                <Loading show={loading} />
            </div>
        </div> : null
        }
    </>
}

