import {createClient} from "@/util/supabase.server";
import { cookies } from 'next/headers'


export async function POST(request: Request) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    let activityType = await supabase
        .from("dnv_activity_type")
        .select();

    return Response.json({
        code: 200,
        data: activityType
    });
}