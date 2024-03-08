import {setActivityRepository} from "@/repository/UltimatumRepository";

export async function POST(request: Request) {
    const {day, activityTypeId} = await request.json();

    const error = await setActivityRepository(day, activityTypeId);

    return Response.json({
        code: 200,
        data: [],
        error
    });
}