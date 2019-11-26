import ICartesianCoordinate, { xCoordType, yCoordType } from "./models/ICartesianCoordinate";
import { getMinValue, getMaxValue } from "../../utils/arrayUtils";
import { chartColours } from "../../themes/colours";

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
    private _domain: IDomain<S, T> | undefined;

    constructor(lines: ILine<S, T>[]) {
        if (lines.length === 0) throw new Error("lines array must contain at least on item");

        this._lines = lines;
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
