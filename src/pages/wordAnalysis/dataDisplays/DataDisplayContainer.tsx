import React, { ReactNode, useState, useEffect } from "react";

import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ErrorMessage from "../../../components/errors/ErrorMessage";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        heading: {
            paddingLeft: "10px",
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular
        },
        loaderContainer: {
            padding: theme.spacing(2)
        },
        errorMessageContainer: {
            padding: theme.spacing(1)
        }
    })
);

export interface IDataDisplayContainerProps<S, T> {
    title: string;
    params: S;
    fetchDataFunction: (params: S) => Promise<T>;
    render: (data: T) => ReactNode;
}

export default function DataDisplayContainer<S, T>(props: IDataDisplayContainerProps<S, T>) {
    const classes = useStyles();

    const { title, fetchDataFunction, params, render } = props;

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<T>();
    const [requestErrorMsg, setRequestErrorMsg] = useState("");

    useEffect(() => {
        setIsLoading(true);

        async function fetchData() {
            try {
                const response = await fetchDataFunction(params);

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
    }, [params, fetchDataFunction]);

    return (
        <>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>{title}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {!isLoading && requestErrorMsg.length === 0 && typeof data !== "undefined" ? (
                        render(data)
                    ) : (
                        <div></div>
                    )}
                </ExpansionPanelDetails>
            </ExpansionPanel>
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
