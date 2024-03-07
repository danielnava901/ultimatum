import React, {useEffect, useState} from 'react';
import {livingInNz, secondVacation, vacation} from "@/util/constants";
import {Day} from "@/components/Day";
import {PanelProvider} from "@/context/PanelContext";
import UltimatumWrapper from "@/components/UltimatumWrapper";
import {getUltimatumDataRepository} from "@/repository/activityRepository";

const getData = async () => {
    return await getUltimatumDataRepository();
}

export default async function Page() {


    const divHidden = <div className="
        bg-lime-400
        bg-violet-500
        bg-yellow-600
        bg-yellow-400
        bg-lime-200
        text-red-800
        text-pink-700
        "></div>

    return <PanelProvider>
        <UltimatumWrapper>
            &nbsp;
        </UltimatumWrapper>
    </PanelProvider>
}
