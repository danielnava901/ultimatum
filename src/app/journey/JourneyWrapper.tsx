"use client"

import {useEffect, useState} from "react";
import React from "react";
import {getUltimatumeRequest} from "@/apiRequests/activityRequest";
import ModalPanel from "@/components/ModalPanel";
import Note from "@/app/journey/Note";


export default function JourneyWrapper() {
    const [dataDays, setData] = useState([]);
    const [_activityTypes, setActivityTypes] = useState([]);
    const [currentNote, setCurrenNote] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const getData = async () => {
        let {daysArray, activityTypes} = await getUltimatumeRequest();
        setData(daysArray);
        setActivityTypes(activityTypes);
    }

    useEffect(() => {
        getData();

    }, [])

    return <div className="w-full flex flex-wrap justify-between">
        {
            dataDays.map((day, index) => {
                let realIndex = index + 1;

                if(isNaN(day) && day[realIndex]["notes"].length > 0) {

                    return <div key={index} className="
                        p-2
                        mr-4 my-2
                        w-full
                        sm:w-2/12
                        h-64
                        border
                        rounded
                        flex
                        flex-col
                        cursor-pointer
                        hover:opacity-75
                        hover:bg-gray-600
                    "
                    onClick={()=>{
                        setCurrentIndex(realIndex);
                        setCurrenNote(day[realIndex]);
                    }}
                    >
                        <Note
                            note={day[realIndex]}
                            activityTypes={_activityTypes}
                            realIndex={realIndex} />

                    </div>
                }

                return null;
            })
        }
        <ModalPanel
            show={!!currentNote}
            onClose={() => {
                setCurrenNote(null);
            }}
        >
            <Note
                note={currentNote}
                activityTypes={_activityTypes}
                realIndex={currentIndex} />
        </ModalPanel>
    </div>
}