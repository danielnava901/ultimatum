"use client"

import React, {createContext, useEffect, useState} from "react";
import {getActivityDayRequest} from "@/apiRequests/activityRequest";

type PanelContextType = {
    show: boolean,
    setShow: any,
    currentDay: number,
    setCurrentDay: any,
    activityData: any,
    activityPerDay: any,
    loading: boolean,
    setLoading: any
}

export const PanelContext = createContext<PanelContextType>({
    show: false,
    setShow: () => {},
    currentDay: 0,
    setCurrentDay: () => {},
    activityData: () => {},
    activityPerDay: [],
    loading: false,
    setLoading: () => {}
});

export const UltimatumProvider = ({children} : {children: React.ReactNode}) => {
    const [show, setShow] = useState(false);
    const [currentDay, setCurrentDay] = useState(0);
    const [activityPerDay, setActivityPerDay] = useState([]);
    const [loading, setLoading] = useState(false);

    const activityData = (day: any) => {
        return [];
    };

    const getActivityDay = async () => {
        let data = await getActivityDayRequest(currentDay)
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
            activityPerDay,
            loading,
            setLoading
        }}>
        {children}
    </PanelContext.Provider>
}