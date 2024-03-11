
export const setActivityDayRequest = async (
    {day, activityTypeId} : {day: string, activityTypeId: string}) => {
    let response = await fetch("/api/day/click", {
        method: "POST",
        body: JSON.stringify({
            day,
            activityTypeId
        })
    });
    let {data: {data}} : any = await response.json();
}

export const getActivityDayRequest = async (day: number) => {
    let response = await fetch("/api/getActivityDay", {
        method: "POST",
        body: JSON.stringify({day: day})
    });
    let {data: {data}} : any = await response.json();

    return data;
}

export const getActivityTypesRequest = async () => {
    let response = await fetch("/api/getActivityTypes", {
        method: "POST"
    });
    let {data: {data}} : any = await response.json();

    return data;
}

export const getUltimatumeRequest = async () => {
    let response = await fetch("/api/ultimatum", {
        method: "POST"
    });
    response = await response.json();
    let {data} : any = response;
    return {
        ...data
    };
}

export const newActivityTypeRequest = async ({name, bgColor} : {name: string, bgColor: string}) => {
    let response = await fetch("/api/activityType/new", {
        method: "POST",
        body: JSON.stringify({
            name, bgColor
        })
    });
    response = await response.json();
    let {data} : any = response;
    return {
        ...data
    };
}

