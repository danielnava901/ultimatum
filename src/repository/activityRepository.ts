import {supabaseClient} from "@/util/supabase.client";

export const getActivities = async () => {
    return await supabaseClient
        .from('dnv_activity')
        .select('id, activity_type_id, day_num');
}

export const getActivityTpes = async () => {
    return await supabaseClient
        .from('dnv_activity_type')
        .select('id, name, bg_color');
}