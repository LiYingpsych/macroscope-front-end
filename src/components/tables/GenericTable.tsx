import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import IColumn from "./models/IColumn";
import Row from "./Row";
import GenericTableHeader from "./GenericTableHeader";

interface IProps<T> {
    columnData: IColumn<T>[];
    data: T[];
    onRowClick?: (id: number) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%"
        },
        tableWrapper: {
            overflowX: "auto" as "auto"
        }
    })
);

export default function GenericTable<T>(props: IProps<T>) {
    const { columnData, data, onRowClick } = props;

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.tableWrapper}>
                <Table aria-labelledby="tableTitle">
                    <GenericTableHeader columnData={columnData} />
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell align="center">No Items</TableCell>
                            </TableRow>
                        ) : (
                            data.map((n, i) => {
                                return (
                                    <Row
                                        onRowClick={onRowClick}
                                        key={i}
                                        columnData={columnData}
                                        rowItemData={n}
                                    />
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
