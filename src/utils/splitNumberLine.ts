import NonPositiveNumberError from "../errors/NonPositiveNumberError";

export default function splitNumberLine(lineLength: number, numberOfSections: number): number[] {
    if (lineLength <= 0) throw new NonPositiveNumberError("lineLength", lineLength);
    if (numberOfSections <= 0)
        throw new NonPositiveNumberError("numberOfSections", numberOfSections);

    const l = lineLength / numberOfSections;

    let pointsArray: number[] = [];
    for (let i = 1; i < numberOfSections; i++) {
        const point = i * l;
        pointsArray.push(point);
    }

    return pointsArray;
}
