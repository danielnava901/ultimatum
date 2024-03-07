
export const setActivityDayRequest = async (
    {day, activityTypeId} : {day: string, activityTypeId: string}) => {
    let response = await fetch("/api/day/click", {
        method: "POST",
        body: JSON.stringify({
            day,
            activityTypeId
        })
    });
    let {data: {data}} = await response.json();
}

export const getActivityDayRequest = async (day: string) => {
    let response = await fetch("/api/getActivityDay", {
        method: "POST",
        body: JSON.stringify({day: day})
    });
    let {data: {data}} = await response.json();

    return data;
}

export const getActivityTypesRequest = async () => {
    let response = await fetch("/api/getActivityTypes", {
        method: "POST"
    });
    let {data: {data}} = await response.json();

    return data;
}