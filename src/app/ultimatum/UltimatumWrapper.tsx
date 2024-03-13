"use client"
import React, {useContext, useEffect, useState} from 'react';
import {Panel} from "./Panel";
import Loading from "@/components/Loading";
import {PanelContext} from "@/context/PanelContext";
import {getUltimatumeRequest} from "@/apiRequests/activityRequest";
import {dayNumToDateLocal, livingInNz, secondVacation, vacation} from "@/util/constants";
import {Day} from "@/app/ultimatum/Day";
import ProcessBar from "@/app/ultimatum/ProcessBar";
import UltimatumSummary from "@/app/ultimatum/UltimatumSummary";

const initData = {
    todayText: '',
    startEFDateDayOfYear: 0,
    daysArray: [],
    endDateEFDayOfYear: 0,
    todayDayOfYear: 0,
    activityTypes: [],
    flyingToChileDate: '',
    flyingToNZDate: ''
};

export default function UltimatumWrapper({children}: {children: React.ReactNode}) {
    const {loading} = useContext(PanelContext);
    const [data, setData] = useState(initData);
    const showOnly = 10;

    const getData = async () => {
        let result = await getUltimatumeRequest();
        setData(result);
    }

    useEffect(() => {
        if(!loading) {
            getData();
        }
    }, [loading]);

    const {
        todayText,
        startEFDateDayOfYear,
        daysArray,
        endDateEFDayOfYear,
        todayDayOfYear,
        activityTypes,
        flyingToChileDate,
        flyingToNZDate
    } = data;

    let totalWeek : number = 0;
    let activitiesTotalWeek : number = 10 * (activityTypes.length || 7);
    const daysIndex : any[] = [];
    const totalDay: any[] = [];

    let days = !!daysArray ?  daysArray.map((day: any, index) => {
        if((index + 1) > (todayDayOfYear - showOnly) && (index + 1) <= (todayDayOfYear + showOnly)) {

            let dateTxtPerDay : any = dayNumToDateLocal(index);
            dateTxtPerDay = dateTxtPerDay.split("/");
            dateTxtPerDay = `${dateTxtPerDay[2]}/${dateTxtPerDay[1]}/${dateTxtPerDay[0]}`

            let dayTxt : any = new Date(dateTxtPerDay).toDateString();
            dayTxt = dayTxt.split(" ");
            dayTxt.pop();
            dayTxt = dayTxt.join(' ');

            if(day !== 0) {
                totalWeek = totalWeek + day[`${index + 1}`].length;
                let tacD = activityTypes.length - day[`${index + 1}`].length;
                let perDay = Math.ceil(day[`${index + 1}`].length * 100 / activityTypes.length);
                totalDay.push(tacD);
                daysIndex.push(`${dayTxt} - ${perDay}%`);
                return day[`${index + 1}`].length;
            }else {
                daysIndex.push(`${dayTxt}`);
                totalDay.push(7);
            }

            return day;
        }
        return false;
    }).filter((day : any, index: number) => {
        return (index + 1) > (todayDayOfYear - showOnly) && (index + 1) <= (todayDayOfYear + showOnly);
    }) : [];

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
        <ProcessBar
            daysArray={daysArray}
            daysIndex={daysIndex}
            days={days}
            totalDay={totalDay}
            height={150}
        />

        <UltimatumSummary
            totalWeek={totalWeek}
            activitiesTotalWeek={activitiesTotalWeek}
            endDateEFDayOfYear={endDateEFDayOfYear}
            todayText={todayText}
            flyingToChileDate={flyingToChileDate}
            startEFDateDayOfYear={startEFDateDayOfYear}
            todayDayOfYear={todayDayOfYear}
            flyingToNZDate={flyingToNZDate}
        />

        <div className="w-full flex flex-wrap justify-start">
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
                }).filter((day: any, index) => {
                    return ((index + 1) > (todayDayOfYear - showOnly))
                })
            }
        </div>
        <Panel/>
        <Loading show={loading} />
    </div>
}