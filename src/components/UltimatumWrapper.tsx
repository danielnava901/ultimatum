"use client"
import React, {useContext, useEffect, useState} from 'react';
import {Panel} from "./Panel";
import Loading from "@/components/Loading";
import {PanelContext} from "@/context/PanelContext";
import {getUltimatumeRequest} from "@/apiRequests/activityRequest";
import {livingInNz, secondVacation, vacation} from "@/util/constants";
import {Day} from "@/components/Day";

const initData = {
    todayText: '',
    startEFDateDayOfYear: 0,
    daysArray: [],
    endDateEFDayOfYear: 0,
    todayDayOfYear: 0,
    activityTypes: []
};
export default function UltimatumWrapper({children}: {children: React.ReactNode}) {
    const {loading} = useContext(PanelContext);
    const [data, setData] = useState(initData);

    const getData = async () => {
        let result = await getUltimatumeRequest();
        setData(result);
    }

    useEffect(() => {
        getData();
    }, []);

    const {
        todayText,
        startEFDateDayOfYear,
        daysArray,
        endDateEFDayOfYear,
        todayDayOfYear,
        activityTypes
    } = data;

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
        <div className="w-full flex p-4 justify-between">
            <div className="p-2 mr-4 flex flex-col">
                <div className="text-lg font-bold text-white">Hoy es:</div>
                <div className="text-xs font-bold text-white">{todayText}</div>
            </div>
            <div className="p-2 mr-4 flex flex-col">
                <div className="text-lg font-bold text-white">Dias restantes</div>
                <div className="text-xs font-bold text-white">
                    {startEFDateDayOfYear - todayDayOfYear}
                </div>
            </div>
            <div className="p-2 mr-4 flex flex-col">
                <div className="text-lg font-bold text-white">Dias en NZ</div>
                <div className="text-xs font-bold text-white">
                    {endDateEFDayOfYear + livingInNz - startEFDateDayOfYear}
                </div>
            </div>

        </div>
        <div className="w-full flex flex-wrap">
            {
                daysArray.map((dayActivities: any, index : number) => {
                    let realIndex = index + 1;
                    /**
                     * Dias_pasados
                     */
                    let isPast = realIndex <= todayDayOfYear ? 'bg-orange-600' : '';
                    /**
                     * Hoy
                     */
                    let isToday = realIndex === todayDayOfYear ? 'twinkle' : '';
                    /**
                     * Dias_antes_de_iniciar_EF
                     */
                    let daysToEf = realIndex < startEFDateDayOfYear ? 'bg-green-600' : '';
                    /**
                     * Dias_de_vacaciones_antes_de_iniciar_EF
                     */
                    let daysBeforeEf = realIndex > (startEFDateDayOfYear - vacation) &&
                    realIndex < startEFDateDayOfYear ? 'bg-rose-500' : '';
                    /**
                     * Fecha_de_inicio_EF_(17_Jun_24)
                     */
                    let startEf = realIndex === startEFDateDayOfYear ? 'twinkle' : '';
                    /**
                     * Estancia_En_NZ
                     */
                    let inNz = realIndex >= startEFDateDayOfYear &&
                    realIndex <= (endDateEFDayOfYear) ? 'bg-blue-600' : '';
                    /**
                     * Tiempo_en_NZ_despues_de_EF
                     */
                    let afterEf = realIndex > (endDateEFDayOfYear) &&
                    realIndex <= (endDateEFDayOfYear + livingInNz) ? 'bg-blue-900' : '';
                    /**
                     * Timpo_vacaciones_2
                     */
                    let clAfterEf = realIndex > (endDateEFDayOfYear + livingInNz) &&
                    realIndex <= (endDateEFDayOfYear + livingInNz + secondVacation) ?
                        'bg-rose-900' : '';

                    return <Day
                        key={realIndex}
                        indexDay={realIndex}
                        dayActivities={dayActivities}
                        activityTypes={activityTypes}
                        className={`
                                ${isPast}
                                ${isToday}
                                ${daysToEf}
                                ${daysBeforeEf}
                                ${startEf}
                                ${inNz}
                                ${afterEf}
                                ${clAfterEf}
                            `}
                    />
                })
            }
        </div>
        <Panel/>
        <Loading show={loading} />
    </div>
}