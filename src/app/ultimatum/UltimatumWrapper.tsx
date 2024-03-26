"use client"
import React, {useContext} from 'react';
import {Panel} from "./Panel";
import Loading from "@/components/Loading";
import {PanelContext} from "@/context/PanelContext";
import {livingInNz, secondVacation, vacation} from "@/util/constants";
import {Day} from "@/app/ultimatum/Day";
import ProcessBar from "@/app/ultimatum/ProcessBar";
import UltimatumSummary from "@/app/ultimatum/UltimatumSummary";
import useUltimatumData from "@/hooks/useUltimatumData";
import Wrapper from "@/components/Wrapper";

export default function UltimatumWrapper() {
    const {loading} : any = useContext(PanelContext);
    const [{
        todayText,
        startEFDateDayOfYear,
        daysArray,
        endDateEFDayOfYear,
        todayDayOfYear,
        activityTypes,
        flyingToChileDate,
        flyingToNZDate,
        days,
        totalDay,
        daysIndex,
        activitiesTotalWeek,
        totalWeek,
        showOnly
    }] = useUltimatumData({loading});



    return <Wrapper>
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
                }).filter((day: any, index) => {
                    return ((index + 1) > (todayDayOfYear - showOnly))
                })
            }
        </div>
        <Panel/>
        <Loading show={loading} />
    </Wrapper>
}