import {createNote, getAllNotes, updateNote} from "@/repository/NotesRepository";

export async function POST(request: Request) {
    let result : any = await getAllNotes();
    let {data} = result;

    return Response.json({
        code: 200,
        data,
        error: null
    });
}