import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import Table, { Size as TableSize } from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import Row from "./Row";
import GenericTableHeader from "./GenericTableHeader";

import IColumn from "./models/IColumn";
import { SortingOrder, stableSort, getSortingCompareFunction } from "../../utils/sorting";

interface ISortingProperties<P> {
    order: SortingOrder;
    orderBy: P;
}

interface IProps<T> {
    columnData: IColumn<T>[];
    data: T[];
    onRowClick?: (item: T) => void;
    size?: TableSize;
    maxHeight?: number;
    sorting?: ISortingProperties<keyof T>;
}

const useStyles = (maxHeight?: number) =>
    makeStyles((theme: Theme) =>
        createStyles({
            root: {
                width: "100%"
            },
            tableWrapper: {
                width: "100%",
                maxHeight: maxHeight,
                overflow: "auto"
            }
        })
    );

export default function GenericTable<T>(props: IProps<T>) {
    const { columnData, data, onRowClick, size, maxHeight, sorting } = props;

    const classes = useStyles(maxHeight)();

    const stickyHeader = typeof maxHeight !== "undefined";

    const [sortingProperties, setSortingProperties] = useState<
        ISortingProperties<keyof T> | undefined
    >(sorting);

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof T) => {
        if (typeof sortingProperties === "undefined") return;

        const isDesc = sortingProperties.orderBy === property && sortingProperties.order === "desc";
        setSortingProperties({
            order: isDesc ? "asc" : "desc",
            orderBy: property
        });
    };

    return (
        <div className={classes.root}>
            <div className={classes.tableWrapper}>
                <Table size={size} stickyHeader={stickyHeader}>
                    <GenericTableHeader
                        columnData={columnData}
                        sorting={
                            typeof sortingProperties === "undefined"
                                ? undefined
                                : {
                                      order: sortingProperties.order,
                                      orderBy: sortingProperties.orderBy,
                                      onRequestSort: handleRequestSort
                                  }
                        }
                    />
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell align="center">No Items</TableCell>
                            </TableRow>
                        ) : typeof sortingProperties === "undefined" ? (
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
                        ) : (
                            stableSort(
                                data,
                                getSortingCompareFunction(
                                    sortingProperties.order,
                                    sortingProperties.orderBy
                                )
                            ).map((rowItemData, i) => {
                                return (
                                    <Row
                                        onRowClick={onRowClick}
                                        key={i}
                                        columnData={columnData}
                                        rowItemData={rowItemData}
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
