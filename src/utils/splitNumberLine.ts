import NonPositiveNumberError from "../errors/NonPositiveNumberError";

export default function splitNumberLine(lineLength: number, numberOfSections: number): number[] {
    if (lineLength <= 0) throw new NonPositiveNumberError("lineLength", lineLength);
    if (numberOfSections <= 0)
        throw new NonPositiveNumberError("numberOfSections", numberOfSections);

    const l = lineLength / numberOfSections;

    let returnArr = [];
    for (let i = 1; i < numberOfSections; i++) {
        returnArr.push(i * l);
    }

    return returnArr;
}
