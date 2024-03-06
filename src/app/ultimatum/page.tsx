import React from 'react';
import {
    dayOfYear,
    daysOfYear,
    endDateEF,
    livingInNz,
    secondVacation,
    startEFDate,
    todayToLocalStr,
    vacation
} from "@/util/constants";
import {Day} from "@/components/Day";
import {PanelProvider} from "@/context/PanelContext";
import {UltimatumWrapper} from "@/components/UltimatumWrapper";
import {getActivities, getActivityTpes} from "@/repository/activityRepository";

async function getData() {
    const today = new Date()
    const todayText = todayToLocalStr()
    const startEFDateDayOfYear = dayOfYear(new Date(startEFDate));
    const endDateEFDayOfYear = dayOfYear(new Date(endDateEF));
    const todayDayOfYear = dayOfYear(today);
    const daysArray = new Array(daysOfYear).fill(0);


    const activities = await getActivities();
    const activityTypes = await getActivityTpes();

    activities.data.map((activityPerDay, index) => {
        let dayMap = daysArray[activityPerDay.day_num - 1];
        if(dayMap !== 0) {
            let mapi = dayMap.get(activityPerDay.day_num)
            let activities = [...mapi, activityPerDay.activity_type_id];
            dayMap.set(activityPerDay.day_num, activities);
        }else {
            dayMap = new Map();
            dayMap.set(activityPerDay.day_num, [activityPerDay.activity_type_id])
            daysArray[activityPerDay.day_num - 1] = dayMap;
        }
    });


    return {
        todayText,
        startEFDateDayOfYear,
        endDateEFDayOfYear,
        todayDayOfYear,
        daysArray,
        activityTypes: activityTypes.data
    };
}

export default async function Page() {
    const data = await getData();
    const {
        todayText,
        startEFDateDayOfYear,
        daysArray,
        endDateEFDayOfYear,
        todayDayOfYear,
        activityTypes
    } = data;

    const divHidden = <div className="
        bg-lime-400
        bg-violet-500
        bg-yellow-600
        bg-yellow-400
        bg-lime-200
        text-red-800
        text-pink-700
        "></div>

    return <PanelProvider>
        <UltimatumWrapper>
            <div className="w-full flex p-4 justify-between">
                <div className="p-2 mr-4 flex flex-col">
                    <div className="text-lg font-bold text-white">Hoy es:</div>
                    <div className="text-xs font-bold text-white">{todayText}</div>
                </div>
                <div className="p-2 mr-4 flex flex-col">
                    <div className="text-lg font-bold text-white">Dias restantes</div>
                    <div className="text-xs font-bold text-white">{startEFDateDayOfYear - todayDayOfYear}</div>
                </div>
                <div className="p-2 mr-4 flex flex-col">
                    <div className="text-lg font-bold text-white">Dias en NZ</div>
                    <div className="text-xs font-bold text-white">{endDateEFDayOfYear + livingInNz - startEFDateDayOfYear}</div>
                </div>

            </div>
            <div className="w-full flex flex-wrap">
                {
                    daysArray.map((dayActivities, index) => {
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
        </UltimatumWrapper>
    </PanelProvider>
}
