export function getStyle(index: string) {
    let position: any;

    switch (index) {
        case 'p_1':
            position = { bottom: 0, left: 0};
            break;
        case 'p_2':
            position = { top: "1.5rem", left: "-0.5rem"};
            break;
        case 'p_3':
            position = { top: 0, left: 0};
            break;
        case 'p_4':
            position = { top: "-0.5rem", left: "1.6rem"};
            break;
        case 'p_5':
            position = { top: 0, right: 0};
            break;
        case 'p_6':
            position = { top: "1.5rem", right: "-0.5rem"};
            break;
        case 'p_7':
            position = { bottom: 0, right: 0};
            break;
        default:
            position = { bottom: 0, left: 0};
    }

    return position;
}