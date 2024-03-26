import {dayNumToText} from "@/util/constants";
import React from "react";

export default function Note({note, activityTypes, realIndex}:
    {note: any, activityTypes: any[], realIndex:  number}) {
    return <>
        <div className="flex mb-2  flex-col">
            <div className="mr-2 px-2 rounded font-bold">{dayNumToText(realIndex)}</div>
            {
                note.act.map((activity, indexNote) => {
                    let actT = activityTypes.find(ac => ac.id === activity.activity_type_id);

                    return <div key={indexNote}
                                className={`${actT.bg_color}
                                                text-black
                                                mr-2
                                                mb-1 
                                                rounded
                                                px-2
                                                md:w-fit
                                                `}>
                        {actT.name}
                    </div>
                })
            }
        </div>
        <div className="flex flex-col mb-2 text-ellipsis overflow-hidden">
            {
                note.notes.map((note, indexNote) => {
                    return <p key={indexNote} className="mb-2"> &gt; {note}</p>
                })
            }
            {note.notes.length === 0 ? "No hay notas" : null}

        </div>
    </>
}