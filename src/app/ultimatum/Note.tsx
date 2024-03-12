import {NoteProps, NoteType} from "@/util/types";
import React, {useState} from "react";


const NoteWrapper = (
    {isNew, children, onClick} : {isNew: boolean, children: React.ReactNode, onClick: () => void }) => {
    return <div className={`
        w-full
        border
        rounded
        border-gray-100
        flex
        items-center
        mt-4
        ${isNew ? "border-2 border-dashed" : "border-l-4 border-l-yellow-400" }
    `} onClick={onClick}>

        <div className={`
                h-full
                mr-2
                flex
                justify-center
                w-full
                cursor-pointer
                ${isNew ? 'bg-gray-200 hover:bg-white text-white hover:text-gray-400' : ''}
            `}>
            {children}
        </div>
    </div>
}

export default function Note(
    {note, isNew, currentDay, onClick}: NoteProps)
{
    const [text, setText] = useState(note?.text || '');

    if(isNew) {
        return <NoteWrapper
            isNew={isNew}
            onClick={() => {
                if(onClick) {
                    onClick();
                }
            }}>
            Nueva nota
        </NoteWrapper>
    }

    return <NoteWrapper
            note={note}
            onClick={() => {
                if(onClick) {
                    onClick();
                }
            }}
            isNew={!!isNew}
    >
        <textarea
            className="w-full max-h-[250px] overflow-y p-2 h-22"
            onChange={(ev) => {
                setText(ev.target.value);
            }}
            value={text}
        />
    </NoteWrapper>
}