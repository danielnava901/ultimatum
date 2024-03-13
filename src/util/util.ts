export function debounce(func : any, time: number) {
    let wait : number = time;
    let timeout : any;


    return function inner(...args : any[]) {
        for (let _len : any = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait);
    };
}