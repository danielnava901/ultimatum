"use client"
import React, {useContext, useEffect, useState} from 'react';
import {Panel} from "./Panel";
import Loading from "@/components/Loading";
import {PanelContext} from "@/context/PanelContext";
import {getUltimatumeRequest} from "@/apiRequests/activityRequest";
import {dayNumToDateLocal, livingInNz, secondVacation, vacation} from "@/util/constants";
import {Day} from "@/app/ultimatum/Day";
import {BarChart} from "@mui/x-charts";

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
    const days = !!daysArray ?  daysArray.map((day: any, index) => {
        if((index + 1) > (todayDayOfYear - 5) && (index + 1) <= (todayDayOfYear + 5)) {
            daysIndex.push(`${dayNumToDateLocal(index)}`);

            if(day !== 0) {
                totalWeek = totalWeek + day[`${index + 1}`].length;
                let tacD = activityTypes.length - day[`${index + 1}`].length;
                totalDay.push(tacD);

                return day[`${index + 1}`].length;
            }else {
                totalDay.push(7);
            }

            return day;
        }
        return false;
    }).filter((day : any, index: number) => {
        return (index + 1) >= (todayDayOfYear - 5) && (index + 1) <= (todayDayOfYear + 5);
    }): [];


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
        <div className="w-full flex justify-between">
            <div className="flex flex-col grow text-white">
                {
                    daysArray.length > 0 ? <BarChart
                        xAxis={[
                            {
                                id: 'barCategories',
                                data: daysIndex,
                                scaleType: 'band',
                            },
                        ]}
                        series={[
                            {
                                data: days, stack: 'activities', color: 'rgba(116, 19, 255, 0.8)'
                            },{
                                data: totalDay, stack: 'activities', color: 'rgba(200,20,200, 0.2)'
                            },
                        ]}
                        height={150}
                        sx={{
                            "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel":{
                                fill:"#f2eaea",
                                fontWeight: "bold",
                                fontSize: "19px"
                            },
                        }}

                    /> : null
                }
            </div>
        </div>
        <div className="w-full flex justify-center flex-col items-center">
            <span className="font-bold">Semanal: {Math.ceil(totalWeek * 100 / activitiesTotalWeek)}%</span>
        </div>
        <div className="w-full flex px-4 justify-between">
            <div className="p-2 mr-4 flex flex-col">
                <div className="mr-4 flex items-center">
                    <div className="font-bold text-white mr-4">Hoy es:</div>
                    <div className="text-xs font-bold text-white">{todayText}</div>
                </div>
                <div className="mr-4 flex items-center">
                    <span className="font-bold text-white mr-4">V a C:</span>
                    <span className="text-xs font-bold text-white">{flyingToChileDate}</span>
                    <span className="mx-4">Falta:</span>
                    <span className="text-xs font-bold text-white">
                        {startEFDateDayOfYear - todayDayOfYear - vacation}
                    </span>
                </div>
                <div className="mr-4 flex items-center">
                    <span className="font-bold text-white mr-4">V a N:</span>
                    <span className="text-xs font-bold text-white">{flyingToNZDate}</span>
                    <span className="mx-4">Falta:</span>
                    <span className="text-xs font-bold text-white">
                        {startEFDateDayOfYear - todayDayOfYear}
                    </span>
                </div>
                <div className="mr-4 flex items-center md:hidden">
                    <span className="font-bold text-white mr-4">Días en NZ</span>
                    <span className="text-xs font-bold text-white">{endDateEFDayOfYear + livingInNz - startEFDateDayOfYear}</span>
                </div>
            </div>
            <div className="mr-4 flex-col hidden md:flex ">
                <div className="text-lg font-bold text-white">Dias en NZ</div>
                <div className="text-xs font-bold text-white">
                    {endDateEFDayOfYear + livingInNz - startEFDateDayOfYear}
                </div>
            </div>
        </div>
        <div className="w-full flex flex-wrap justify-between">
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