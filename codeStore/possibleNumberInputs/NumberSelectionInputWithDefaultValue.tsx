import React from "react";
import SelectionInput, { ISelectionOption } from "./SelectionInput";

interface IProps {
    label: string;
    numbers: number[];
    defaultNumber: number;
    onChange: (selectedNumber: number) => void;
}

export default function NumberSelectionInput(props: IProps) {
    const { label, numbers, defaultNumber, onChange } = props;

    let orderedNumbers = numbers.sort((a: number, b: number)=> a - b)
    const smallestNumber = orderedNumbers[0]
    const largestNumber = orderedNumbers[orderedNumbers.length - 1]

    const options: ISelectionOption<number>[] = numbers.map((year: number) => {
        return { value: year, label: year.toString() };
    });

    let _defaultNumber = defaultNumber
    if (_defaultNumber < smallestNumber) {
        _defaultNumber = smallestNumber
    } else if (_defaultNumber > largestNumber) {
        _defaultNumber = largestNumber
    }

    const defaultOption: ISelectionOption<number> = {
        value: _defaultNumber,
        label: _defaultNumber.toString()
    };

    return (
        <SelectionInput
            label={label}
            options={options}
            defaultOption={defaultOption}
            onChange={onChange}
        />
    );
}
