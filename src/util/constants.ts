export const vacation = 10;
export const secondVacation = 5;
export const livingInNz = 15;
export const startEFDate = '2024-6-16'
export const endDateEF = '2024-11-15'
export const daysOfYear = 366; /*2024*/

export const dayOfYear : any = (date: any) =>
    Math.ceil((date - new Date(date.getFullYear(), 0, 0)) / 86_400_000);

export const dayNumToDate = (num: number) => new Date(new Date().getFullYear(), 0, num);

export const dayNumToDateLocal = (num: number) => {
    let d : any = new Date(new Date().getFullYear(), 0, num);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

export const todayToLocalStr = () => {
    let d : any = new Date();
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}