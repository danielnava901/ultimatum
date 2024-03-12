import Note from "@/app/ultimatum/Note";
import {useEffect, useState} from "react";
import {NoteType} from "@/util/types";
import {debounce} from "@/util/util";
import {actionNote, getAllNotes} from "@/apiRequests/notesRequest";

const defaultNote = {
    id: -1,
    note: '',
    created_at: new Date(),
    day_num: -1
};

export default function Notes({currentDay}: {currentDay: any}) {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [currentNote, setCurrenNote] = useState<NoteType>(defaultNote);
    const [id, setId] = useState(-1);
    const [hasChange, setHasChange] = useState(false);

    const getNewNoteDefault = (day_num) => {
        setId(id - 1);
        return {...defaultNote, id, day_num}
    }

    const onClickNew = () => {
        let newN : NoteType = getNewNoteDefault(currentDay);
        setCurrenNote(newN);
        setNotes([...notes, newN]);
    }

    const debounceFn = debounce(async (note: NoteType) => {
        setHasChange(!hasChange);
        let response : any = await actionNote(note);
        setCurrenNote(response);
        await getData();
    }, 200);

    const onChange = (note: NoteType, text : any) => {
        let updateNote : NoteType = {...currentNote, note: text};
        debounceFn(updateNote);
    }

    const getData = async () => {
        let response = await getAllNotes(currentDay);
        setNotes([...response]);
    }

    useEffect(() => {
        getData();
    }, []);

    return <div className="w-full flex flex-col">
        <div className="w-full flex flex-col max-h-[300px] overflow-y-auto">
            {
                notes.map((note: NoteType, index: number) => {
                    return <Note
                        key={index}
                        note={note}
                        currentDay={currentDay}
                        onClick={() => {}}
                        onChange={onChange}
                        onFocus={() =>{
                            console.log("bligr", note);
                            setCurrenNote(note);
                        }}
                    />
                })
            }

        </div>
        <Note
            isNew
            note={currentNote}
            currentDay={currentDay}
            onClick={onClickNew}
        />
    </div>
}