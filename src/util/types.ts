import React from "react";

export type NoteType = {
    id: number,
    note?: string,
    created_at?: Date,
    day_num?: number
}

export type NoteProps = {
    note?: NoteType,
    isNew?: boolean,
    currentDay: any,
    onClick?: () => void,
    onChange?: (note : NoteType, text: string) => void,
    onFocus?: () => void,
    children?: React.ReactNode
}

