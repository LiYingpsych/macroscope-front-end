import React, { useState, useEffect } from "react";
import ISynonymListSettings from "../models/ISynonymListSettings";
import { ClosestSearchMethod } from "../../../services/backendApi/models/requestParameters/ClosestSearchMethod";
import { BackendApi } from "../../../services/backendApi/BackendApi";
import { IClosestDataModel, IClosestWordModel } from "../../../models/IClosestDataModel";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";

import Title from "../../../components/Title";
import ErrorMessage from "../../../components/errors/ErrorMessage";
import CircularProgress from "@material-ui/core/CircularProgress";

const backendApi = new BackendApi();

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tableWrapper: {
            maxHeight: 440,
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
}

export default function SynonymTable(props: IProps) {
    const classes = useStyles();

    const { searchTerm, settings } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<IClosestDataModel>();
    const [requestErrorMsg, setRequestErrorMsg] = useState("");

    useEffect(() => {
        setIsLoading(true);

        async function fetchData() {
            try {
                const response = await backendApi.getClosest({
                    searchTerm: searchTerm,
                    year: settings.year,
                    numberOfClosestWords: settings.numberOfSynonyms,
                    // TODO: extract method into default settings?
                    method: ClosestSearchMethod.SGNS
                });

                setData(response);
                setRequestErrorMsg("");
            } catch (error) {
                const errorMsg = error.response.data;
                setRequestErrorMsg(errorMsg);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [searchTerm, settings]);

    return (
        <Paper>
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
                            {!isLoading ? (
                                <TableCell>
                                    <Title>Relative score</Title>
                                </TableCell>
                            ) : null}
                        </TableRow>
                    </TableHead>
                    {!isLoading && requestErrorMsg.length === 0 ? (
                        <SynonymTableRows data={data} />
                    ) : null}
                </Table>
            </div>
            {isLoading ? (
                <Grid container justify="center" className={classes.loaderContainer}>
                    <Grid item>
                        <CircularProgress color="secondary" />
                    </Grid>
                </Grid>
            ) : null}
            {requestErrorMsg.length > 0 && !isLoading ? (
                <Grid container justify="center" className={classes.errorMessageContainer}>
                    <Grid item>
                        <ErrorMessage>{requestErrorMsg}</ErrorMessage>
                    </Grid>
                </Grid>
            ) : null}
        </Paper>
    );
}

interface ISynonymsTableProps {
    data?: IClosestDataModel;
}

function SynonymTableRows(props: ISynonymsTableProps) {
    const { data } = props;

    if (typeof data === "undefined") return null;

    return (
        <TableBody>
            {data.closestWords.map((synonym: IClosestWordModel) => {
                return (
                    <TableRow hover>
                        <TableCell>{synonym.word.value}</TableCell>
                        <TableCell>{synonym.score}</TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
    );
}
