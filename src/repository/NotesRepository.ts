import {supabaseClient} from "@/util/supabase.client";
import {NoteType} from "@/util/types";

export async function createNote({note} : {note: NoteType})
{
    console.log("4", {note});

    return await supabaseClient
        .from("note_day")
        .insert({
            note: note.note,
            day_num: note.day_num
        }).select();
}

export async function updateNote({note} : {note: NoteType})
{
    console.log("5", {note});
    return await supabaseClient
        .from("note_day")
        .update({
            "note": note.note
        })
        .eq("id", note.id)
        .select();
}

export async function getAllNotes()
{
    console.log("5 all");
    return await supabaseClient
        .from("note_day")
        .select();
}