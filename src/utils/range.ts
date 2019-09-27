export default function range(intervalStart: number, intervalEnd: number, step: number) {
    let i: number = intervalStart;
    let rangeArray: number[] = [];

    while (i <= intervalEnd) {
        rangeArray.push(i);
        i += step;
    }

    return rangeArray;
}
