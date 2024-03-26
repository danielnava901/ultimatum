import React, {useEffect, useState} from "react";

export default function ModalPanel(
    {
        show = false,
        children,
        onClose = () => {}
    }: {show: boolean, children: React.ReactNode, onClose: () => void}) {


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
                    onClose();
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
                flex
                flex-col
                flex-wrap
                relative
            "
                 style={{zIndex: 99}}
                 onClick={(ev) => {
                     ev.stopPropagation();
                 }}
            >
                {children}
            </div>
        </div>: null
        }
    </>
}