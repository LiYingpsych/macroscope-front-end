export default function range(intervalStart: number, intervalEnd: number, step: number = 1) {
    let i: number = intervalStart;
    let rangeArray: number[] = [];

    while (i <= intervalEnd) {
        rangeArray.push(i);
        i += step;
    }

    return rangeArray;
}
