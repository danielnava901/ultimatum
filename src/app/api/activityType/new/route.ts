import {createActivityTypeByName, existActivityTypeByName} from "@/repository/ActivityRepository";

export async function POST(request: Request) {
    const {name, bgColor} = await request.json();

    let existByName = await existActivityTypeByName({name});
    let newActivityType = null;

    if(!existByName) {
        newActivityType = await createActivityTypeByName({name, bgColor});
    }

    return Response.json({
        code: 200,
        data: {
            newActivityType
        }
    });
}