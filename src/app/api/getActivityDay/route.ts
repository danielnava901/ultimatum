import {createClient} from "@/util/supabase.server";
import { cookies } from 'next/headers'


export async function POST(request: Request) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const {day} = await request.json();

    let activity = await supabase
        .from("dnv_activity")
        .select()
        .eq("day_num", `${day}`);


    return Response.json({
        code: 200,
        data: activity
    });
}