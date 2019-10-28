import React from "react";
import ISynonymListSettings from "../../models/ISynonymListSettings";
import IClosestData from "../../../../models/IClosestData";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";

import Title from "../../../../components/Title";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tableWrapper: {
            width: "100%",
            maxHeight: 432,
            overflow: "auto"
        },
        tableHeaders: {
            padding: theme.spacing(2)
        },
        loaderContainer: {
            padding: theme.spacing(2)
        },
        errorMessageContainer: {
            padding: theme.spacing(1)
        }
    })
);

interface IProps {
    searchTerm: string;
    settings: ISynonymListSettings;
    data: IClosestData;
}

export default function SynonymTable(props: IProps) {
    const classes = useStyles();

    const { searchTerm, settings, data } = props;

    return (
        <div className={classes.tableWrapper}>
            <Table size="small" stickyHeader>
                <TableHead className={classes.tableHeaders}>
                    <TableRow>
                        <TableCell>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Title>Synonyms of {searchTerm}</Title>
                                </Grid>
                                <Grid item>({settings.year})</Grid>
                            </Grid>
                        </TableCell>
                        <TableCell>
                            <Title>Relative score</Title>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <SynonymTableRows data={data} />
            </Table>
        </div>
    );
}

interface ISynonymsTableProps {
    data?: IClosestData;
}

function SynonymTableRows(props: ISynonymsTableProps) {
    const { data } = props;

    if (typeof data === "undefined") return null;

    return (
        <TableBody>
            {data.closestWords.map((synonym, i) => {
                return (
                    <TableRow key={i} hover>
                        <TableCell>{synonym.word.value}</TableCell>
                        <TableCell>{synonym.score}</TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
    );
}
