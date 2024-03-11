"use client";

import React, {useContext, useState} from "react";
import {PanelContext} from "@/context/PanelContext";
import {newActivityTypeRequest, setActivityDayRequest} from "@/apiRequests/activityRequest";


export default function ActivityType({type}: any) {
    const {currentDay, activityPerDay, setShow, setLoading} = useContext(PanelContext);
    const [showText, setShowText] = useState(false);
    const [newText, setNewText] = useState('');

    const onClickActivity = async (activityType: any) => {
        if(activityType.id === 99) {
            setShowText(prev => !prev);
        }else {
            setLoading(true);
            await setActivityDayRequest({
                day: `${currentDay}`,
                activityTypeId: `${activityType.id}`
            });
            setLoading(false);
            setShow(false);
            setTimeout(() => {setShow(true)}, 1);
        }
    }

    const sendNewActivityType = async () => {
        setLoading(true);
        let response = await newActivityTypeRequest({
            name: newText,
            bgColor: 'bg-green-400'
        });
        setLoading(false);
        setShow(false);
        setTimeout(() => {setShow(true)}, 1);
    }

    return (
        <div className="flex flex-col items-center">
            <div
                className="flex flex-col mx-8"
                onClick={async () => {
                    await onClickActivity(type);
                }}
            >
                <div>{type.name}</div>
                <div className={`
                cursor-pointer
                rounded-full 
                h-8 
                w-8 
                border 
                flex justify-center items-center ${type.bg_color}
            `}>
                    {activityPerDay.map((day: any, index: number) => {
                        return day.day_num === currentDay && day.activity_type_id === type.id ?
                            <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="text-pink-700">
                                <path fillRule="evenodd"
                                      d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                                      clipRule="evenodd" />
                            </svg>
                            : ''
                    })}
                </div>

            </div>
            {
                showText ? <div className="w-full flex items-center justify-center">
                    <input type="text"
                           className="p-2 rounded border border-blue-400 w-full h-8"
                           value={newText}
                           onChange={(ev) => {
                               setNewText(ev.target.value)
                           }}
                    />
                    <button
                        onClick={() => {
                            sendNewActivityType();
                        }}
                        className="
                        w-8
                        h-8
                        ml-2 p-1
                        rounded flex items-center justify-center bg-blue-400 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             fill="none"
                             viewBox="0 0 24 24"
                             strokeWidth={1.5}
                             stroke="currentColor"
                             className="w-6 h-6">
                            <path strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>
                    </button>
                </div> : null
            }
        </div>

    )
}