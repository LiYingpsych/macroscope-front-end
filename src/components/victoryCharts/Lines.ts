import ICartesianCoordinate, { xCoordType, yCoordType } from "./models/ICartesianCoordinate";
import { getMinValue, getMaxValue } from "../../utils/arrayUtils";

export interface ILine<S extends xCoordType, T extends yCoordType> {
    coords: ICartesianCoordinate<S, T>[];
    legendLabel: string;
}

interface IDomain<S extends xCoordType, T extends yCoordType> {
    xMin: S;
    xMax: S;
    yMin: T;
    yMax: T;
}

export default class Lines<S extends xCoordType, T extends yCoordType> {
    private _lines: ILine<S, T>[];
    private _domain: IDomain<S, T>;

    constructor(lines: ILine<S, T>[]) {
        if (lines.length === 0) throw new Error("lines array must contain at least on item");

        this._lines = lines;
        this._domain = this.getDomain(lines);
    }

    public get items(): ILine<S, T>[] {
        return this._lines;
    }

    public get domain(): IDomain<S, T> {
        if (typeof this._domain !== "undefined") return this._domain;

        const domain: IDomain<S, T> = {
            xMin: this.getMin(coord => coord.x),
            xMax: this.getMax(coord => coord.x),
            yMin: this.getMin(coord => coord.y),
            yMax: this.getMax(coord => coord.y)
        };

        this._domain = domain;

        return this._domain;
    }

    public getYIntersectionCoordinates(x: S | null): ICartesianCoordinate<S, T>[] {
        if (x === null) return [];

        let intersectionCoords = [];

        for (let index = 0; index < this._lines.length; index++) {
            const line = this._lines[index];

            const closestCoord = this.getIntersectionCoordinate(x, line.coords);

            intersectionCoords.push(closestCoord);
        }

        return intersectionCoords;
    }

    public getClosestXCoordinate(x: S) {
        let diff = undefined;
        let coord = this._lines[0].coords[0];

        for (let index = 0; index < this._lines.length; index++) {
            const line = this._lines[index];

            for (let index = 0; index < line.coords.length; index++) {
                const currentCoord = line.coords[index];
                const tempDiff = Math.abs((currentCoord.x as number) - (x as number));

                if (typeof diff === "undefined") {
                    diff = tempDiff;
                }

                if (tempDiff < diff) {
                    diff = tempDiff;
                    coord = currentCoord;
                }
            }
        }

        return coord.x;
    }

    private getIntersectionCoordinate(
        xCoord: S,
        possibleCoords: ICartesianCoordinate<S, T>[]
    ): ICartesianCoordinate<S, T> {
        let diff = undefined;
        let coord = possibleCoords[0];

        for (let index = 0; index < possibleCoords.length; index++) {
            const currentCoord = possibleCoords[index];
            const tempDiff = Math.abs((currentCoord.x as number) - (xCoord as number));

            if (typeof diff === "undefined") {
                diff = tempDiff;
            }

            if (tempDiff < diff) {
                diff = tempDiff;
                coord = currentCoord;
            }
        }

        return coord;
    }

    private getDomain(lines: ILine<S, T>[]): IDomain<S, T> {
        const domain: IDomain<S, T> = {
            xMin: this.getMin(coord => coord.x),
            xMax: this.getMax(coord => coord.x),
            yMin: this.getMin(coord => coord.y),
            yMax: this.getMax(coord => coord.y)
        };

        return domain;
    }

    private getMin<U>(propAccessorCallback: (coord: ICartesianCoordinate<S, T>) => U) {
        return this.getEndValue(propAccessorCallback, "min");
    }

    private getMax<U>(propAccessorCallback: (coord: ICartesianCoordinate<S, T>) => U) {
        return this.getEndValue(propAccessorCallback, "max");
    }

    private getEndValue<U>(
        propAccessorCallback: (coord: ICartesianCoordinate<S, T>) => U,
        type: "min" | "max"
    ) {
        const func = type === "min" ? getMinValue : getMaxValue;

        let store = [];
        for (let index = 0; index < this._lines.length; index++) {
            const line = this._lines[index];

            store.push(func(line.coords.map(propAccessorCallback)));
        }

        return func(store);
    }
}
