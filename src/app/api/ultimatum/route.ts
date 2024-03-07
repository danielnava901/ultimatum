import {getUltimatumDataRepository} from "@/repository/activityRepository";

export async function GET(request: Request) {

    let data = await getUltimatumDataRepository()
    const {
        todayText,
        startEFDateDayOfYear,
        daysArray,
        endDateEFDayOfYear,
        todayDayOfYear,
        activityTypes
    } = data;
    return Response.json({
        code: 200,
        data: {
            todayText,
            startEFDateDayOfYear,
            daysArray,
            endDateEFDayOfYear,
            todayDayOfYear,
            activityTypes
        }
    })
}