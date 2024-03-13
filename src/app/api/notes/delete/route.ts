import {deleteNote} from "@/repository/NotesRepository";

export async function POST(request: Request) {
    const {note} : any = await request.json();
    let result : any = await deleteNote(note);
    let {data} : any = result;

    return Response.json({
        code: 200,
        data
    });
}