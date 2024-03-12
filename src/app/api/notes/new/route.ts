import {createNote, updateNote} from "@/repository/NotesRepository";


export async function POST(request: Request) {
    const {note, dayNum} = await request.json();
    let result : any = null;

    console.log("1", {note});
    if(note.id > 0) {
        console.log("2 update..");
        result = await updateNote({note});
    }else {
        console.log("3 create..");
        result = await createNote({note});
    }

    let {data} : any = result;

    return Response.json({
        code: 200,
        data: data.length > 0 ? data[0] : [],
        error: null
    });
}