"use client"

import React, {createContext, useEffect, useState} from "react";
import useGetActivityData from "@/hooks/useGetActivityData";

type PanelContextType = {
    show: boolean,
    setShow: any,
    currentDay: number|null,
    setCurrentDay: any,
    activityData: any,
    activityPerDay: any
}

export const PanelContext = createContext<PanelContextType>({
    show: false,
    setShow: () => {},
    currentDay: null,
    setCurrentDay: () => {},
    activityData: () => {},
    activityPerDay: []
});

export const PanelProvider = ({children}) => {
    const [show, setShow] = useState(false);
    const [currentDay, setCurrentDay] = useState(null);
    const [activityPerDay, setActivityPerDay] = useState([]);

    const activityData = (day) => {
        console.log("context activity data");
        return useGetActivityData(day);
    };

    const getActivityDay = async () => {
        let response = await fetch("/api/getActivityDay", {
            method: "POST",
            body: JSON.stringify({day: currentDay})
        });
        let {data: {data}} = await response.json();

        setActivityPerDay(data);
    }

    useEffect(() => {
        if(show) {
            getActivityDay();
        }
    }, [show]);

    return <PanelContext.Provider
        value={{
            show,
            setShow,
            currentDay,
            setCurrentDay,
            activityData,
            activityPerDay
        }}>
        {children}
    </PanelContext.Provider>
}