import {supabaseClient} from "@/util/supabase.client";

export async function existActivityTypeByName({name} : {name: string}) {
    let {status, data} : any = await supabaseClient
        .from('dnv_activity_type')
        .select()
        .eq("name", name);

    return status === 200 && !!data && data.length > 0;


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