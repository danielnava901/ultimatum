import {getUltimatumDataRepository} from "@/repository/activityRepository";

export async function GET(request: Request) {

    let data = await getUltimatumDataRepository()

    return Response.json({
        code: 200,
        data
    })
}