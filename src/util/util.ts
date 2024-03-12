export function debounce<T extends unknown[], U>(func) {
    let wait = arguments.length <= 1 || arguments[1] === undefined ? 100 : arguments[1];
    let timeout = void 0;

    return function (...args: T) {
        let _this = this;

        for (let _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        clearTimeout(timeout);
        timeout = setTimeout(function () {
            func.apply(_this, args);
        }, wait);
    };
}