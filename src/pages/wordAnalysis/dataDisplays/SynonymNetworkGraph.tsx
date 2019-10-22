import React, { useState, useEffect } from "react";
import BackendApi from "../../../services/backendApi/BackendApi";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import ErrorMessage from "../../../components/errors/ErrorMessage";
import ISynonymNetworkSettings from "../models/ISynonymNetworkSettings";
import NetworkGraph, { IGraphData } from "../../../components/NetworkGraph";
import INode from "../../../models/INode";
import IEdge from "../../../models/IEdge";

const backendApi = new BackendApi();

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            "& svg": {
                width: "100% !important"
            }
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
    settings: ISynonymNetworkSettings;
}

export default function SynonymNetworkGraph(props: IProps) {
    const classes = useStyles();

    const { searchTerm, settings } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<IGraphData<string>>();
    const [requestErrorMsg, setRequestErrorMsg] = useState("");

    useEffect(() => {
        setIsLoading(true);

        async function fetchData() {
            try {
                const response = await backendApi.getSynonymNetwork({
                    searchTerm: searchTerm,
                    year: settings.year,
                    synonymsPerTarget: settings.synonymsPerTarget,
                    similarityThreshold: settings.similarityThreshold
                });

                const _data: IGraphData<string> = {
                    nodes: response.synonymNetwork.nodes.map((node: INode) => {
                        return {
                            id: node.word.value
                        };
                    }),
                    links: response.synonymNetwork.edges.map((edge: IEdge) => {
                        return {
                            source: edge.source,
                            target: edge.target
                        };
                    })
                };

                setData(_data);
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
        <>
            {!isLoading && requestErrorMsg.length === 0 ? (
                typeof data !== "undefined" ? (
                    <NetworkGraph
                        id="Synonym-network-graph"
                        data={data}
                        config={{ automaticRearrangeAfterDropNode: true }}
                    />
                ) : null
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
        </>
    );
}
