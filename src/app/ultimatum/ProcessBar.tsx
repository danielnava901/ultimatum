import {BarChart} from "@mui/x-charts";
import React from "react";

type ProcessBarType = {
    daysArray: any[],
    daysIndex: any[],
    days: any[],
    totalDay: any[],
    height: number
}

export default function ProcessBar(
    {
        daysArray,
        daysIndex,
        days,
        totalDay,
        height
    }: ProcessBarType) {

    if(daysArray.length === 0 ||
        days.length === 0 ||
        totalDay.length === 0 ||
        daysIndex.length === 0
    ) {
        return <div>No data</div>
    }

    return <div className="flex flex-col grow text-white w-full">
        <BarChart
            xAxis={[
                {
                    id: 'barCategories',
                    data: daysIndex,
                    scaleType: 'band',
                },
            ]}
            series={[
                {
                    data: days,
                    stack: 'activities',
                    color: 'rgba(116, 19, 255, 0.8)'
                },{
                    data: totalDay,
                    stack: 'activities',
                    color: 'rgba(200,20,200, 0.2)'
                },
            ]}
            height={height}
            sx={{
                "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel":{
                    fill:"#f2eaea",
                    fontWeight: "bold",
                    fontSize: "18px"
                },
            }}
        />
    </div>
}