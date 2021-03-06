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
import Tooltip from "@material-ui/core/Tooltip";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ErrorMessage from "components/errors/ErrorMessage";
import useDeepCompareEffect from "customHooks/useDeepCompareEffect";
import JsonDownloadLink from "components/links/JsonDownloadLink";

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
        panelDetailsContainer: {
            padding: 0,
            display: "flex"
        },
        panelDetails: {
            flex: 1
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
        exportButtonContainer: {
            marginRight: theme.spacing(1)
        },
        exportButton: {
            margin: theme.spacing(0.25)
        },
        noMarginTop: {
            marginTop: "0px !important "
        }
    })
);

export interface IDataDisplayContainerProps<S, T> {
    isDisplayed: boolean;
    title: string;
    params: S;
    fetchDataFunction: (params: S) => Promise<T | undefined>;
    render: (data: T) => ReactNode;
    firstItem?: boolean;
}

export default function DataDisplayContainer<S, T>(props: IDataDisplayContainerProps<S, T>) {
    const classes = useStyles();

    const { isDisplayed, title, fetchDataFunction, params, render, firstItem = false } = props;

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

                if (typeof response !== "undefined") {
                    setIsLoading(false);
                    setData(response);
                    setRequestErrorMsg("");
                }
            } catch (error) {
                if (typeof error.response === "undefined") throw error;

                const errorMsg = error.response.data;
                setRequestErrorMsg(errorMsg);
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
                isDisplayed ? "" : classes.hide,
                firstItem ? classes.noMarginTop : ""
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
            <ExpansionPanelDetails className={classes.panelDetailsContainer}>
                <div className={classes.panelDetails}>
                    {!isError && !isLoading && typeof data !== "undefined" ? (
                        <Grid container direction="column">
                            <Grid container item>
                                <div
                                    // Fix for following issue - https://github.com/StraightOuttaCrompton/macroscope-front-end/issues/6
                                    className="safari-height-bug-fix"
                                >
                                    {render(data)}
                                </div>
                            </Grid>
                            <Grid container item justify="flex-end">
                                <Grid item className={classes.exportButtonContainer}>
                                    <JsonDownloadLink json={data} fileName={downloadFileName}>
                                        <Tooltip title="Export results" placement="left">
                                            <IconButton
                                                color="secondary"
                                                className={classes.exportButton}
                                                component="span"
                                            >
                                                <GetApp />
                                            </IconButton>
                                        </Tooltip>
                                    </JsonDownloadLink>
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
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}
