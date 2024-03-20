import {useEffect, useState} from "react";
import {getUltimatumeRequest} from "@/apiRequests/activityRequest";
import {dayNumToDateLocal} from "@/util/constants";

const initData = {
    todayText: '',
    startEFDateDayOfYear: 0,
    daysArray: [],
    endDateEFDayOfYear: 0,
    todayDayOfYear: 0,
    activityTypes: [],
    flyingToChileDate: '',
    flyingToNZDate: ''
};

export default function useUltimatumData() {
    const [activitiesTotalWeek, setActivitiesTotalWeek] = useState(7);
    const [__result, setResult] = useState(initData);
    const [days, setDays] = useState([]);
    const [daysIndex, setDaysIndex] = useState([]);
    const [totalDay, setTotalDay] = useState([]);

    const showOnly = 10;
    let totalWeek : number = 0;

    const buildResult = (_result) => {
        setActivitiesTotalWeek(10 * (_result.activityTypes.length));
        let _daysIndex : any[] = [];
        let _totalDay: any[] = [];

        if(_result.daysArray.length) {
            let _days = _result.daysArray.map((day: any, index) => {
                if((index + 1) > (_result.todayDayOfYear - showOnly) &&
                    (index + 1) <= (_result.todayDayOfYear + showOnly)) {

                    let dateTxtPerDay : any = dayNumToDateLocal(index);
                    dateTxtPerDay = dateTxtPerDay.split("/");
                    dateTxtPerDay = `${dateTxtPerDay[2]}/${dateTxtPerDay[1]}/${dateTxtPerDay[0]}`

                    let dayTxt : any = new Date(dateTxtPerDay).toDateString();
                    dayTxt = dayTxt.split(" ");
                    dayTxt.pop();
                    dayTxt = dayTxt.join(' ');

                    if(day !== 0) {
                        totalWeek = totalWeek + day[`${index + 1}`].length;
                        let tacD = _result.activityTypes.length - day[`${index + 1}`].length;
                        let perDay = Math.ceil(day[`${index + 1}`].length * 100 / _result.activityTypes.length);
                        _totalDay.push(tacD);
                        _daysIndex.push(`${dayTxt} - ${perDay}%`);
                        return day[`${index + 1}`].length;
                    }else {
                        _daysIndex.push(`${dayTxt}`);
                        _totalDay.push(7);
                    }

                    return day;
                }
                return false;
            }).filter((day : any, index: number) => {
                return (index + 1) > (_result.todayDayOfYear - showOnly) && (index + 1) <= (_result.todayDayOfYear + showOnly);
            });

            setDays(_days);
        }

        setDaysIndex(_daysIndex);
        setTotalDay(_totalDay);
    }

    const getData = async () => {
        let result = await getUltimatumeRequest();
        setResult(result);
        buildResult(result);
    }

    useEffect(() => {
        getData()
    }, []);


    return [{
        ...__result,
        days,
        totalDay,
        daysIndex,
        activitiesTotalWeek,
        totalWeek,
        showOnly
    }, getData]
}