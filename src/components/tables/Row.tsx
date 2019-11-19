import React from "react";
import IColumn from "./models/IColumn";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

interface IProps<T> {
    columnData: IColumn<T>[];
    rowItemData: T;
    onRowClick?: (id: number) => void;
}

export default function Row<T>(props: IProps<T>) {
    const { rowItemData, columnData, onRowClick } = props;

    const isClickable = typeof onRowClick !== "undefined";

    const handleClick = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => () => {
        console.log("row click!");
    };

    return (
        <TableRow tabIndex={-1} hover={isClickable} onClick={handleClick}>
            {columnData.map((column, i) => {
                return <TableCell key={i}>{rowItemData[column.dataPropertyKey]}</TableCell>;
            })}
        </TableRow>
    );
}
