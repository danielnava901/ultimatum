export const vacation = 10;
export const secondVacation = 5;
export const livingInNz = 15;
export const startEFDate = '2024-6-17'
export const endDateEF = '2024-11-15'
export const daysOfYear = 366; /*2024*/

export const daysWeek = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
export const monthsOfYear = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export const dayOfYear = (date: Date): number => {
    return Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0)
        .getTime()) / 86_400_000);
};

export const dayNumToDate = (num: number) => new Date(new Date().getFullYear(), 0, num);

export const dayNumToDateLocal = (num: number) => {
    let d : any = new Date(new Date().getFullYear(), 0, num);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

export const todayToLocalStr = () => {
    let d : any = new Date();
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

export const dayNumToText = (num: number) => {
    let d : any = new Date(new Date().getFullYear(), 0, num);
    let dayWeek = daysWeek[d.getDay() - 1];
    let monthOfYear = monthsOfYear[d.getMonth()];
    return `${dayWeek} ${d.getDate()} de ${monthOfYear} del ${d.getFullYear()}`;

}