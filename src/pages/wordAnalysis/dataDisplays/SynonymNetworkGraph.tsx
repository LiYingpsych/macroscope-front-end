import React, { useState, useEffect } from "react";
import BackendApi from "../../../services/backendApi/BackendApi";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Title from "../../../components/Title";
import ErrorMessage from "../../../components/errors/ErrorMessage";
import CircularProgress from "@material-ui/core/CircularProgress";
import ISynonymNetworkSettings from "../models/ISynonymNetworkSettings";
import NetworkGraph from "../../../components/NetworkGraph";
import ISynonymNetworkData from "../../../models/ISynonymNetworkData";

const backendApi = new BackendApi();

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
    settings: ISynonymNetworkSettings;
}

export default function SynonymNetworkGraph(props: IProps) {
    const classes = useStyles();

    const { searchTerm, settings } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<ISynonymNetworkData>();
    const [requestErrorMsg, setRequestErrorMsg] = useState("");

    useEffect(() => {
        setIsLoading(true);

        async function fetchData() {
            try {
                const response = await backendApi.getSynonymNetwork({
                    searchTerm: searchTerm,
                    year: settings.year,
                    synonymsPerTarget: settings.synonymsPerTarget,
                    // TODO: extract method into default settings?
                    similarityThreshold: settings.similarityThreshold
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
            {!isLoading && requestErrorMsg.length === 0 ? (
                <NetworkGraph
                    nodes={[]}
                    edges={[]}
                    // data={data}
                />
            ) : null}
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
