import {supabaseClient} from "@/util/supabase.client";
import {NoteType} from "@/util/types";

export async function createNote({note} : {note: NoteType})
{
    return await supabaseClient
        .from("note_day")
        .insert({
            note: note.note,
            day_num: note.day_num
        }).select();
}

export async function updateNote({note} : {note: NoteType})
{
    return await supabaseClient
        .from("note_day")
        .update({
            "note": note.note
        })
        .eq("id", note.id)
        .select();
}

export async function getAllNotesByDay(dayNum: number)
{
    return await supabaseClient
        .from("note_day")
        .select()
        .eq("day_num", +dayNum)
        .is("deleted_at",  null)
        ;
}

export async function deleteNote(note: NoteType)
{
    return await supabaseClient
        .from("note_day")
        .update({"deleted_at": new Date()})
        .eq("id", +note.id);
}