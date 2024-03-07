import {supabaseClient} from "@/util/supabase.client";
import {dayOfYear, daysOfYear, endDateEF, startEFDate, todayToLocalStr} from "@/util/constants";


export const getActivitiesRepository = async () => {
    return await supabaseClient
        .from('dnv_activity')
        .select('id, activity_type_id, day_num');
}

export const getActivitiesByDayAndActivityRepository = async (day, activityTypeId) => {
    return await supabaseClient
        .from('dnv_activity')
        .select('id, activity_type_id, day_num')
        .eq("day_num", day)
        .eq("activity_type_id", activityTypeId)
        .single()
        ;

}

export const getActivityTypesRepository = async () => {
    return await supabaseClient
        .from('dnv_activity_type')
        .select('id, name, bg_color');
}

export const setActivityRepository = async (day_num: number, activity_type_id: number) => {
    let {data} = await getActivitiesByDayAndActivityRepository(day_num, activity_type_id);

    if(data) {
        await supabaseClient.from("dnv_activity")
            .delete()
            .eq('id', data.id)
        ;

        return 0;
    }else {
        await supabaseClient
            .from('dnv_activity')
            .upsert({
                activity_type_id,
                day_num
            });

        return 1;
    }

}

export const getUltimatumDataRepository = async () => {
    const today = new Date()
    const todayText = todayToLocalStr()
    const startEFDateDayOfYear = dayOfYear(new Date(startEFDate));
    const endDateEFDayOfYear = dayOfYear(new Date(endDateEF));
    const todayDayOfYear = dayOfYear(today);
    const daysArray = new Array(daysOfYear).fill(0);


    const activities = await getActivitiesRepository();
    const activityTypes = await getActivityTypesRepository();

    activities.data.map((activityPerDay: any, index: number) => {
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