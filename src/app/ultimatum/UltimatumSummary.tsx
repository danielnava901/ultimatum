import {livingInNz, vacation} from "@/util/constants";
import React from "react";

export default function UltimatumSummary(
    {
        todayText,
        flyingToChileDate,
        startEFDateDayOfYear,
        todayDayOfYear,
        flyingToNZDate,
        endDateEFDayOfYear,
        totalWeek,
        activitiesTotalWeek
    }
) {
    return <div className="w-full flex px-4 justify-between flex-col">
        <div className="w-full flex justify-center flex-col items-center">
            <span className="font-bold">
                Semanal: {Math.ceil(totalWeek * 100 / activitiesTotalWeek)}%
            </span>
        </div>
        <div className="w-full flex justify-between">
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
                <div className="mr-4 flex items-center sm:hidden">
                    <span className="font-bold text-white mr-4">Días en NZ</span>
                    <span className="text-xs font-bold text-white">
                    {endDateEFDayOfYear + livingInNz - startEFDateDayOfYear}
                </span>
                </div>
            </div>
            <div className="mr-4 flex-col hidden sm:flex ">
                <div className="text-lg font-bold text-white">Dias en NZ</div>
                <div className="text-xs font-bold text-white">
                    {endDateEFDayOfYear + livingInNz - startEFDateDayOfYear}
                </div>
            </div>
        </div>
    </div>
}