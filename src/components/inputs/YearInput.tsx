import React from "react";
import SelectionInput, { SelectionOption } from "./SelectionInput";

interface IProps {
    years: number[];
    defaultYear: number;
    onChange: (selectedYear: number) => void;
}

export default function YearInput(props: IProps) {
    const { years, defaultYear, onChange } = props;

    const options: SelectionOption<number>[] = years.map((year: number) => {
        return { value: year, label: year.toString() };
    });

    const defaultOption: SelectionOption<number> = {
        value: defaultYear,
        label: defaultYear.toString()
    };

    return (
        <SelectionInput
            label="year"
            options={options}
            defaultOption={defaultOption}
            onChange={onChange}
        />
    );
}
