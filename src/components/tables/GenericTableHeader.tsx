import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import IColumn from "./models/IColumn";
import Title from "../Title";

interface IProps<T> {
    columnData: IColumn<T>[];
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        tableHeaders: {
            padding: theme.spacing(2)
        }
    })
);

export default function GenericTableHeader<T>(props: IProps<T>) {
    const { columnData } = props;

    const classes = useStyles();

    return (
        <TableHead className={classes.tableHeaders}>
            <TableRow>
                {columnData.map((column, i) => {
                    return (
                        <TableCell key={i}>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Title>{column.label}</Title>
                                </Grid>
                                <Grid item>{column.subLabel}</Grid>
                            </Grid>
                        </TableCell>
                    );
                })}
            </TableRow>
        </TableHead>
    );
}
