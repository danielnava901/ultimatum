import {createNote, getAllNotesByDay, updateNote} from "@/repository/NotesRepository";

export async function POST(request: Request) {
    let {dayNum} : any = await request.json();
    let result : any = await getAllNotesByDay(dayNum);
    let {data} : any = result;

    return Response.json({
        code: 200,
        data,
        error: null
    });
}