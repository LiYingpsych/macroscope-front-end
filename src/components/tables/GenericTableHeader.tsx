import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import TableSortLabel from "@material-ui/core/TableSortLabel";

import Title from "../Title";

import IColumn from "./models/IColumn";
import SortingOrder from "./models/SortingOrder";

interface IHeaderSortingProperties<P> {
    onRequestSort: (event: React.MouseEvent<unknown>, property: P) => void;
    order: SortingOrder;
    orderBy: P;
}

interface IProps<T> {
    columnData: IColumn<T>[];
    sorting?: IHeaderSortingProperties<keyof T>;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paperBackgroundColor: { backgroundColor: theme.palette.background.paper }
    })
);

export default function GenericTableHeader<T>(props: IProps<T>) {
    const { columnData, sorting } = props;

    const classes = useStyles();

    const createSortHandler = (property: keyof T) => (event: React.MouseEvent<unknown>) => {
        if (typeof sorting !== "undefined") sorting.onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {columnData.map((column, i) => {
                    const contents = (
                        <Grid container spacing={1}>
                            <Grid item>
                                <Title>{column.label}</Title>
                            </Grid>
                            <Grid item>{column.subLabel}</Grid>
                        </Grid>
                    );

                    return (
                        <TableCell key={i} classes={{ stickyHeader: classes.paperBackgroundColor }}>
                            {typeof sorting === "undefined" ? (
                                contents
                            ) : (
                                <TableSortLabel
                                    active={sorting.orderBy === column.dataPropertyKey}
                                    direction={sorting.order}
                                    onClick={createSortHandler(column.dataPropertyKey)}
                                >
                                    {contents}
                                </TableSortLabel>
                            )}
                        </TableCell>
                    );
                })}
            </TableRow>
        </TableHead>
    );
}
