import {getUltimatumDataRepository} from "@/repository/UltimatumRepository";

export async function POST(request: Request) {

    let data = await getUltimatumDataRepository();


    return Response.json({
        code: 200,
        data: {
            ...data
        }
    })
}