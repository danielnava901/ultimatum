import { useState, useEffect } from 'react';

export default function useGetActivityData(day) {
    const [activityData, setActivityData] = useState<any>(null);

    const getData = async () => {
        let response = await fetch("/api/getUltimatumDay", {
            body: JSON.stringify({
                day
            })
        });
        console.log("dataresponse", response);
        setActivityData(response);
    }

    useEffect(() => {
        getData();
    }, []);

    return activityData
}