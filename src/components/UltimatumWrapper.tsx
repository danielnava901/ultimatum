import React from 'react';
import {Panel} from "./Panel";

export const UltimatumWrapper : React.FC = ({children}) => {
    return <div
        className="
            w-[100vw]
            h-[100vh]
            text-[0.9rem]
            lg:text-md
            relative
            fira-mono-medium"
        style={{zIndex: 9}}>
        {children}
        <Panel/>
    </div>
}