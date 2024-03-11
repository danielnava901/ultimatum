import {supabaseClient} from "@/util/supabase.client";

export async function existActivityTypeByName({name} : {name: string}) {
    console.log("checar....", name);
    let {status, data} = await supabaseClient
        .from('dnv_activity_type')
        .select()
        .eq("name", name);

    if(status === 200 && data.length > 0) {
        return true;
    }

    return false;
}

export async function createActivityTypeByName(
    {name, bgColor} : {name: string, bgColor: string}) {
    return await supabaseClient
        .from('dnv_activity_type')
        .insert({
            name,
            bg_color: bgColor
        });
}