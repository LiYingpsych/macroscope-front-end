import React from "react";
import NumberSelectionInput from "./NumberSelectionInput";

interface IProps {
    years: number[];
    defaultYear: number;
    onChange: (selectedYear: number) => void;
}

export default function YearInput(props: IProps) {
    const { years, defaultYear, onChange } = props;

    return (
        <NumberSelectionInput
            label="year"
            numbers={years}
            defaultNumber={defaultYear}
            onChange={onChange}
        />
    );
}
