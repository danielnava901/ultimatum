import {NoteProps} from "@/util/types";
import React, {useState} from "react";


const NoteWrapper = (
    {isNew, children, onClick} : NoteProps) => {
    return <div className={`
            w-full
            border
            rounded
            border-gray-100
            flex
            items-center
            mt-4
            ${isNew ? "border-2 border-dashed" : "border-l-4 border-l-yellow-400" }
        `}
        onClick={onClick}
    >

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
    {note, isNew, currentDay, onClick, onChange, onFocus}: NoteProps)
{
    const [text, setText] = useState(note?.note || '');

    if(isNew) {
        return <NoteWrapper
            currentDay={currentDay}
            isNew={isNew}
            onClick={() => {
                !!onClick && onClick();
            }}>
            Nueva nota
        </NoteWrapper>
    }

    return <NoteWrapper
            currentDay={currentDay}
            onClick={() => {
                !!onClick && onClick();
            }}
            isNew={!!isNew}
    >
        <textarea
            className="w-full max-h-[250px] overflow-y p-2 h-22"
            onChange={(ev) => {
                setText(ev.target.value);
                (!!note && !!onChange) && onChange(note, ev.target.value);
            }}
            onFocus={onFocus}
            value={text}
        />
    </NoteWrapper>
}