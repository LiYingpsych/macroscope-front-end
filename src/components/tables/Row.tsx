import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import IColumn from "./models/IColumn";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        clickableRow: {
            cursor: "pointer"
        }
    })
);

interface IProps<T> {
    columnData: IColumn<T>[];
    rowItemData: T;
    onRowClick?: (item: T) => void;
}

export default function Row<T>(props: IProps<T>) {
    const { rowItemData, columnData, onRowClick } = props;
    const classes = useStyles();

    const handleClick = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
        if (typeof onRowClick !== "undefined") onRowClick(rowItemData);
    };

    return (
        <TableRow
            tabIndex={-1}
            hover={typeof onRowClick !== "undefined"}
            onClick={handleClick}
            className={typeof onRowClick !== "undefined" ? classes.clickableRow : ""}
        >
            {columnData.map((column, i) => {
                return <TableCell key={i}>{rowItemData[column.dataPropertyKey]}</TableCell>;
            })}
        </TableRow>
    );
}
