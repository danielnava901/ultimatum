import React from "react";

export default function Wrapper({children}: {children: React.ReactNode}) {


    return <div className="
            w-[100vw]
            h-[100vh]
            text-[0.9rem]
            lg:text-md
            relative
            fira-mono-medium
            relative
            p-2
            "
        style={{zIndex: 9}}>
        {children}
    </div>
}