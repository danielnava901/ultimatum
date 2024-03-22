import {supabaseClient} from "@/util/supabase.client";
import {
    dayNumToDateLocal,
    dayOfYear,
    daysOfYear,
    endDateEF,
    startEFDate,
    todayToLocalStr,
    vacation
} from "@/util/constants";
import {getCountNotesGroupByDay} from "@/repository/NotesRepository";


export const getActivitiesRepository = async () => {
    let {data, error} = await supabaseClient
        .from('dnv_activity')
        .select('id, activity_type_id, day_num');

    if(error) {
        return []
    }

    return data;
}

export const getActivitiesByDayAndActivityRepository = async (day: number, activityTypeId: number) => {
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
    const flyingToChileDate = dayNumToDateLocal(startEFDateDayOfYear - vacation);
    const flyingToNZDate = dayNumToDateLocal(startEFDateDayOfYear - 1);

    const activities = await getActivitiesRepository();
    const activityTypes = await getActivityTypesRepository();

    /*Regesa las notas por dia*/
    const noteMap = await getCountNotesGroupByDay();

    let realDaysArray = daysArray.map((day, index) => {
         let realDay = index + 1;
         let dayObj = {};
         let activitiesPerDay = activities.filter(activity => activity.day_num === realDay);
         let notesPerDay = noteMap.has(realDay) ? noteMap.get(realDay) : [];

         if(activitiesPerDay.length === 0 && notesPerDay.length === 0) {
             return 0;
         }


         dayObj[realDay] = {
             act: activitiesPerDay,
             notes: notesPerDay
         };

         return dayObj;
    });

    activities.map((activityPerDay: any, index: number) => {

        let dayMap = daysArray[activityPerDay.day_num - 1];
        let dayNotes = noteMap.has(activityPerDay.day_num) ? noteMap.get(activityPerDay.day_num) : []

        if(dayMap !== 0) {
            let mapi = dayMap[activityPerDay.day_num]["act"];
            dayMap[activityPerDay.day_num]["act"] = [...mapi, activityPerDay.activity_type_id];
            dayMap[activityPerDay.day_num]["notes"] = dayNotes;

        }else {
            dayMap = {};

            dayMap[activityPerDay.day_num] = {
                act: [activityPerDay.activity_type_id],
                notes: dayNotes
            };
            daysArray[activityPerDay.day_num - 1] = dayMap;
        }
    });


    return {
        todayText,
        startEFDateDayOfYear,
        endDateEFDayOfYear,
        todayDayOfYear,
        daysArray: realDaysArray,
        activityTypes: activityTypes.data,
        flyingToChileDate,
        flyingToNZDate
    };
}