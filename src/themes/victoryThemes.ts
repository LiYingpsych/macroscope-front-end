import assign from "lodash.assign";
import { VictoryThemeDefinition, ThemeBaseProps } from "victory";
import { Theme } from "@material-ui/core/styles";

// Put it all together...
const defaultTheme = (muiTheme: Theme): VictoryThemeDefinition => {
    // Colors
    const yellow200 = "#FFF59D";
    const deepOrange600 = "#F4511E";
    const lime300 = "#DCE775";
    const lightGreen500 = "#8BC34A";
    const teal700 = "#00796B";
    const cyan900 = "#006064";
    const colors = [deepOrange600, yellow200, lime300, lightGreen500, teal700, cyan900];
    const blueGrey50 = "#ECEFF1";
    const grey900 = "#212121";

    // Typography
    const sansSerif = "'Roboto', 'Helvetica Neue', Helvetica, sans-serif";
    const letterSpacing = "normal";

    // Layout
    const padding = 12;
    const baseProps: ThemeBaseProps = {
        width: 350,
        height: 350,
        padding: 50,
        colorScale: colors
    };

    // * Labels
    const baseLabelStyles = {
        fontFamily: sansSerif,
        fontSize: muiTheme.typography.fontSize,
        letterSpacing,
        padding,
        fill: muiTheme.palette.primary.main,
        stroke: "transparent",
        strokeWidth: 0
    };

    const centeredLabelStyles = assign({ textAnchor: "middle" }, baseLabelStyles);

    // Strokes
    const strokeLinecap = "round";
    const strokeLinejoin = "round";

    return {
        area: assign(
            {
                style: {
                    data: {
                        fill: grey900
                    },
                    labels: centeredLabelStyles
                }
            },
            baseProps
        ),
        axis: assign(
            {
                style: {
                    axis: {
                        fill: "transparent",
                        stroke: muiTheme.palette.primary.light,
                        strokeWidth: 2,
                        strokeLinecap,
                        strokeLinejoin
                    },
                    axisLabel: assign({}, centeredLabelStyles, {
                        padding,
                        fontWeight: "bold",
                        stroke: "transparent"
                    }),
                    grid: {
                        fill: "none",
                        stroke: "none",
                        pointerEvents: "painted"
                    },
                    ticks: {
                        fill: "transparent",
                        size: 5,
                        stroke: muiTheme.palette.primary.light,
                        strokeWidth: 1,
                        strokeLinecap,
                        strokeLinejoin
                    },
                    tickLabels: assign({}, baseLabelStyles, {
                        fill: muiTheme.palette.primary.main
                    })
                }
            },
            baseProps
        ),
        bar: assign(
            {
                style: {
                    data: {
                        fill: muiTheme.palette.primary.main,
                        padding,
                        strokeWidth: 0
                    },
                    labels: baseLabelStyles
                }
            },
            baseProps
        ),
        boxplot: assign(
            {
                style: {
                    max: {
                        padding,
                        stroke: muiTheme.palette.primary.main,
                        strokeWidth: 1
                    },
                    maxLabels: baseLabelStyles,
                    median: {
                        padding,
                        stroke: muiTheme.palette.primary.main,
                        strokeWidth: 1
                    },
                    medianLabels: baseLabelStyles,
                    min: {
                        padding,
                        stroke: muiTheme.palette.primary.main,
                        strokeWidth: 1
                    },
                    minLabels: baseLabelStyles,
                    q1: {
                        padding,
                        fill: muiTheme.palette.primary.main
                    },
                    q1Labels: baseLabelStyles,
                    q3: {
                        padding,
                        fill: muiTheme.palette.primary.main
                    },
                    q3Labels: baseLabelStyles
                },
                boxWidth: 20
            },
            baseProps
        ),
        candlestick: assign(
            {
                style: {
                    data: {
                        stroke: muiTheme.palette.primary.main
                    },
                    labels: centeredLabelStyles
                },
                candleColors: {
                    positive: "#ffffff",
                    negative: muiTheme.palette.primary.main
                }
            },
            baseProps
        ),
        chart: baseProps,
        errorbar: assign(
            {
                borderWidth: 8,
                style: {
                    data: {
                        fill: "transparent",
                        opacity: 1,
                        stroke: muiTheme.palette.primary.main,
                        strokeWidth: 2
                    },
                    labels: centeredLabelStyles
                }
            },
            baseProps
        ),
        group: assign({}, baseProps),
        legend: assign(
            {
                gutter: 10,
                orientation: "vertical",
                titleOrientation: "top",
                style: {
                    data: {
                        type: "circle"
                    },
                    labels: baseLabelStyles,
                    title: assign({}, baseLabelStyles, { padding: 5 })
                }
            },
            baseProps
        ),
        line: assign(
            {
                style: {
                    data: {
                        fill: "transparent",
                        opacity: 1,
                        stroke: muiTheme.palette.primary.main,
                        strokeWidth: 2
                    },
                    labels: centeredLabelStyles
                }
            },
            baseProps
        ),
        pie: assign(
            {
                style: {
                    data: {
                        padding,
                        stroke: blueGrey50,
                        strokeWidth: 1
                    },
                    labels: assign({}, baseLabelStyles, { padding: 20 })
                }
            },
            baseProps
        ),
        scatter: assign(
            {
                style: {
                    data: {
                        fill: muiTheme.palette.primary.main,
                        opacity: 1,
                        stroke: "transparent",
                        strokeWidth: 0
                    },
                    labels: centeredLabelStyles
                }
            },
            baseProps
        ),
        stack: assign({}, baseProps),
        tooltip: {
            style: assign({}, centeredLabelStyles, {
                padding: 5,
                pointerEvents: "none"
            }),
            flyoutStyle: {
                stroke: grey900,
                strokeWidth: 1,
                fill: "#f0f0f0",
                pointerEvents: "none"
            },
            cornerRadius: 5,
            pointerLength: 10
        },
        voronoi: assign(
            {
                style: {
                    data: {
                        fill: "transparent",
                        stroke: "transparent",
                        strokeWidth: 0
                    },
                    labels: assign({}, centeredLabelStyles, {
                        padding: 5,
                        pointerEvents: "none"
                    }),
                    flyout: {
                        stroke: grey900,
                        strokeWidth: 1,
                        fill: "#f0f0f0",
                        pointerEvents: "none"
                    }
                }
            },
            baseProps
        )
    };
};

export default { defaultTheme: defaultTheme };
