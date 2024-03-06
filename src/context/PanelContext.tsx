"use client"

import React, {createContext, useEffect, useState} from "react";
import useGetActivityData from "@/hooks/useGetActivityData";
import {getActivityDayRequest} from "@/apiRequests/activityRequest";

type PanelContextType = {
    show: boolean,
    setShow: any,
    currentDay: number|null,
    setCurrentDay: any,
    activityData: any,
    activityPerDay: any,
    loading: boolean,
    setLoading: any
}

export const PanelContext = createContext<PanelContextType>({
    show: false,
    setShow: () => {},
    currentDay: null,
    setCurrentDay: () => {},
    activityData: () => {},
    activityPerDay: [],
    loading: false,
    setLoading: () => {}
});

export const PanelProvider = ({children}) => {
    const [show, setShow] = useState(false);
    const [currentDay, setCurrentDay] = useState(null);
    const [activityPerDay, setActivityPerDay] = useState([]);
    const [loading, setLoading] = useState(false);

    const activityData = (day) => {
        return useGetActivityData(day);
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