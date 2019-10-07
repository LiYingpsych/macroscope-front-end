import React from "react";
import SelectionInput, { ISelectionOption } from "./SelectionInput";

interface IProps {
    label: string;
    numbers: number[];
    defaultNumber: number;
    onChange: (selectedNumber: number) => void;
    onValidationError?: () => void;
}

export default function NumberSelectionInput(props: IProps) {
    const { label, numbers, defaultNumber, onChange, onValidationError } = props;

    const options: ISelectionOption<number>[] = numbers.map((year: number) => {
        return { value: year, label: year.toString() };
    });

    const defaultOption: ISelectionOption<number> = {
        value: defaultNumber,
        label: defaultNumber.toString()
    };

    return (
        <SelectionInput
            label={label}
            options={options}
            defaultOption={defaultOption}
            onChange={onChange}
            onValidationError={onValidationError}
        />
    );
}
