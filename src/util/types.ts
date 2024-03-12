export type NoteType = {
    id: number,
    text: string,
    created_at: Date,
    day_num: number
}

export type NoteProps = {
    note?: NoteType,
    isNew?: boolean,
    currentDay: any,
    onClick?: () => void
}

