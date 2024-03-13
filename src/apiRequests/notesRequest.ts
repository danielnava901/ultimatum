import {NoteType} from "@/util/types";

export const getAllNotes = async (dayNum: number) => {
    let response : any = await fetch("/api/notes/get", {
        method: "POST",
        body: JSON.stringify({
            dayNum
        })
    });
    response = await response.json();
    let {data} : any = response;
    return data;
}

export const newOrUpdateNote = async (note: NoteType) =>
{
    let response : any = await fetch("/api/notes/new", {
        method: "POST",
        body: JSON.stringify({
            note
        })
    });
    response = await response.json();
    let {data} : any = response;
    return data;
}

export const deleteNote = async (note: NoteType) =>
{
    let response : any = await fetch("/api/notes/delete", {
        method: "POST",
        body: JSON.stringify({
            note
        })
    });
    response = await response.json();
    let {data} : any = response;
    return data;
}

export const actionNote = async (note: NoteType) =>
{
    return await newOrUpdateNote(note);
}