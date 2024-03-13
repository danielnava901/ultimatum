import Note from "@/app/ultimatum/Note";
import {useEffect, useState} from "react";
import {NoteType} from "@/util/types";
import {actionNote, deleteNote, getAllNotes} from "@/apiRequests/notesRequest";
import { useDebouncedCallback } from 'use-debounce';
import 'react-swipeable-list/dist/styles.css';
import {LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions} from "react-swipeable-list";


const defaultNote = {
    id: -1,
    note: '',
    created_at: new Date(),
    day_num: -1
};

export default function Notes({currentDay}: {currentDay: number}) {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [currentNote, setCurrenNote] = useState<NoteType>(defaultNote);
    const [id, setId] = useState(-1);
    const [hasChange, setHasChange] = useState(false);

    const getNewNoteDefault = (day_num: number) => {
        setId(id - 1);
        return {...defaultNote, id, day_num}
    }

    const onClickNew = () => {
        let newN : NoteType = getNewNoteDefault(currentDay);
        setCurrenNote(newN);
        setNotes([...notes, newN]);
    }

    const debounceFn = useDebouncedCallback(async (note: NoteType) => {
        setHasChange(!hasChange);
        let response : any = await actionNote(note);
        setCurrenNote(response);
        await getData();
    }, 500);

    const onChange = async (note: NoteType, text : any) => {
        let updateNote : NoteType = {...currentNote, note: text};
        await debounceFn(updateNote);
    }

    const onDelete = async () => {
        let response : any = await deleteNote(currentNote);
        setCurrenNote(defaultNote);
        await getData();
    }

    const getData = async () => {
        let response = await getAllNotes(currentDay);
        setNotes([...response]);
    }

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                destructive={true}
                onClick={() => onDelete()}
            >
                <div className="bg-red-600 text-white w-full h-fit rounded
                    flex justify-center items-center p-4">
                    Borrar
                </div>
            </SwipeAction>
        </TrailingActions>
    );


    useEffect(() => {
        getData();
    }, []);

    return <div className="w-full flex flex-col">
        <div className="w-full flex flex-col max-h-[300px] overflow-y-auto">
            <SwipeableList >
            {
                notes.map((note: NoteType, index: number) => {
                    return <SwipeableListItem
                            key={index}
                            trailingActions={trailingActions()}
                        >
                            <Note
                                note={note}
                                currentDay={currentDay}
                                onClick={() => {}}
                                onChange={onChange}
                                onFocus={() =>{
                                    setCurrenNote(note);
                                }}
                            />
                        </SwipeableListItem>

                })
            }
            </SwipeableList>
        </div>
        <Note
            isNew
            note={currentNote}
            currentDay={currentDay}
            onClick={onClickNew}
        />
    </div>
}