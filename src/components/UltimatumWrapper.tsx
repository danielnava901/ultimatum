"use client"
import React, {useContext} from 'react';
import {Panel} from "./Panel";
import Loading from "@/components/Loading";
import {PanelContext} from "@/context/PanelContext";

export const UltimatumWrapper = ({children}: {children: React.ReactNode}) => {
    const {loading} = useContext(PanelContext);

    return <div
            className="
            w-[100vw]
            h-[100vh]
            text-[0.9rem]
            lg:text-md
            relative
            fira-mono-medium
            relative
            "
        style={{zIndex: 9}}>
        {children}
        <Panel/>
        <Loading show={loading} />
    </div>
}