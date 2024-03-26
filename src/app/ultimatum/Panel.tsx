"use client"
import React, {useContext, useEffect, useRef, useState} from 'react';
import {PanelContext} from "@/context/PanelContext";
import {dayNumToDate} from "@/util/constants";
import ActivityType from "@/app/ultimatum/ActivityType";
import {getActivityTypesRequest} from "@/apiRequests/activityRequest";
import Notes from "@/app/ultimatum/Notes";
import ModalPanel from "@/components/ModalPanel";

export const Panel : React.FC = () => {
    const {show, setShow, currentDay, setLoading} = useContext(PanelContext);
    const [day, setDay] = useState('');
    const [activityTypes, setActivityTypes] = useState([]);

    const getActivityTypes = async () => {
        setLoading(true);
        let data = await getActivityTypesRequest();
        setActivityTypes(data);
        setLoading(false);
    }


    useEffect(() => {
        if(!isNaN(currentDay)) {
            setDay(dayNumToDate(currentDay).toLocaleDateString());
        }
        if(show) {
            getActivityTypes();
        }
    }, [show]);

    return <>
        <ModalPanel show={show} onClose={() => {
            setShow(!show)
        }} >
            <div className="mb-4">Día: {currentDay} - {day}</div>
            <div className="flex items-center justify-between mb-4 flex mt-4">
                <div className="flex overflow-x-auto
                        border rounded
                        p-2
                        max-w-[350px]
                        md:max-w-[550px]
                        lg:max-w-[750px]
                        xl:max-w-[950px]
                    ">
                    {
                        activityTypes.map((type: any, index: number) => {
                            return <ActivityType
                                key={type.id}
                                type={type}
                            />
                        })
                    }
                </div>

                <ActivityType
                    type={{
                        id: 99,
                        name: "Otro",
                        bg_color: "bg-gray-400"
                    }} />
            </div>
            <Notes currentDay={currentDay} />
        </ModalPanel>
    </>
}

