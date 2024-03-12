import Note from "@/app/ultimatum/Note";
import {useState} from "react";
import {NoteType} from "@/util/types";



export default function Notes({currentDay}: {currentDay: any}) {
    const [notes, setNotes] = useState<NoteType[]>([]);

    const onClickNew = () => {
        console.log("onclic new");
        setNotes([...notes, {
            id: -1,
            text: '',
            day_num: currentDay,
            created_at: new Date()
        }])
    }

    return <div className="w-full flex flex-col">
        <div className="w-full flex flex-col max-h-[300px] overflow-y-auto">
            {
                notes.map((note: NoteType, index: number) => {
                    return <Note
                        key={index}
                        note={note}
                        currentDay={currentDay}
                        onClick={() => {}}
                    />
                })
            }

        </div>
        <Note isNew
              currentDay={currentDay}
              onClick={onClickNew}
        />
    </div>
}