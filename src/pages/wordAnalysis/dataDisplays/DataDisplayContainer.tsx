import React, { ReactNode, useState } from "react";
import classnames from "classnames";

import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import IconButton from "@material-ui/core/IconButton";
import GetApp from "@material-ui/icons/GetApp";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ErrorMessage from "../../../components/errors/ErrorMessage";
import useDeepCompareEffect from "../../../customHooks/useDeepCompareEffect";
import JsonDownloadLink from "../../../components/links/JsonDownloadLink";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
        panelSummary: {
            "&:hover": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText
            }
        },
        panelSummaryBottomBorder: {
            borderBottom: `1px solid ${theme.palette.grey[300]}`
        },
        heading: {
            paddingLeft: "10px",
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular
        },
        panelDetails: {
            padding: 0
        },
        linearLoader: {
            position: "absolute",
            width: "100%",
            left: 0,
            bottom: -1
        },
        errorMessageContainer: {
            padding: theme.spacing(1)
        },
        errorBorder: {
            border: `1px solid ${theme.palette.error.main}`
        },
        hide: {
            display: "none"
        },
        exportButton: {
            margin: theme.spacing(0.25)
        }
    })
);

export interface IDataDisplayContainerProps<S, T> {
    isDisplayed: boolean;
    title: string;
    params: S;
    fetchDataFunction: (params: S) => Promise<T>;
    render: (data: T) => ReactNode;
}

export default function DataDisplayContainer<S, T>(props: IDataDisplayContainerProps<S, T>) {
    const classes = useStyles();

    const { isDisplayed, title, fetchDataFunction, params, render } = props;

    const downloadFileName = `${title.toLowerCase().replace(" ", "-")}_${Object.values(params).join(
        "-"
    )}`;

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<T>();
    const [requestErrorMsg, setRequestErrorMsg] = useState("");

    const defaultIsExpanded = true;
    const [isExpanded, setIsExpanded] = useState(defaultIsExpanded);

    useDeepCompareEffect(() => {
        setIsLoading(true);

        async function fetchData() {
            if (!isDisplayed) return;
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
    }, [params, fetchDataFunction, isDisplayed]);

    const onChange = (event: object, expanded: boolean) => {
        setIsExpanded(expanded);
    };

    const isError = requestErrorMsg.length > 0;

    return (
        <ExpansionPanel
            className={classnames(
                classes.root,
                isError && !isLoading ? classes.errorBorder : "",
                isDisplayed ? "" : classes.hide
            )}
            defaultExpanded={defaultIsExpanded}
            onChange={onChange}
        >
            <ExpansionPanelSummary
                className={classnames(
                    isExpanded ? classes.panelSummaryBottomBorder : ""
                    // classes.panelSummary // Hover class
                )}
                expandIcon={<ExpandMoreIcon />}
                IconButtonProps={{
                    color: "inherit"
                }}
            >
                <Typography className={classes.heading}>{title}</Typography>
                {isLoading ? (
                    <LinearProgress className={classes.linearLoader} color="secondary" />
                ) : null}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.panelDetails}>
                <>
                    {!isError && !isLoading && typeof data !== "undefined" ? (
                        <Grid container direction="column">
                            <Grid item>{render(data)}</Grid>
                            <Grid container item justify="flex-end">
                                <Grid item>
                                    <IconButton
                                        color="primary"
                                        className={classes.exportButton}
                                        component="span"
                                    >
                                        <JsonDownloadLink json={data} fileName={downloadFileName}>
                                            <GetApp />
                                        </JsonDownloadLink>
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    ) : null}
                    {isError && !isLoading ? (
                        <Grid container justify="center" className={classes.errorMessageContainer}>
                            <Grid item>
                                <ErrorMessage message={requestErrorMsg} />
                            </Grid>
                        </Grid>
                    ) : null}
                </>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}
