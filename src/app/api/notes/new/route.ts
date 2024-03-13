import {createNote, updateNote} from "@/repository/NotesRepository";


export async function POST(request: Request) {
    const {note} = await request.json();
    let result : any;

    if(note.id > 0) {
        result = await updateNote({note});
    }else {
        result = await createNote({note});
    }

    let {data} : any = result;

    return Response.json({
        code: 200,
        data: data.length > 0 ? data[0] : [],
        error: null
    });
}