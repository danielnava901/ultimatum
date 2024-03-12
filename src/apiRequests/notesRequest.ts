import {NoteType} from "@/util/types";

export const getAllNotes = async () => {
    let response = await fetch("/api/notes/get", {
        method: "POST",
    });
    response = await response.json();
    let {data} = response;
    return data;
}

export const newOrUpdateNote = async (note: NoteType) =>
{
    let response = await fetch("/api/notes/new", {
        method: "POST",
        body: JSON.stringify({
            note
        })
    });
    response = await response.json();
    let {data} = response;
    return data;
}

export const deleteNote = async (note: NoteType) =>
{

    return "delete";
}

export const actionNote = async (note: NoteType) =>
{
    let response = null;

    if(note.note?.length === 0 && note.id > 0) {
        console.log("delete...")
        response = await deleteNote(note);
    }else {
        console.log("crear...")
        response = await newOrUpdateNote(note);
    }
    console.log({res: response});

    return response;
}