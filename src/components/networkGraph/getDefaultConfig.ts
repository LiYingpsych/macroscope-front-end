import IGraphConfig from "./models/configs/IGraphConfig";
import { Theme } from "@material-ui/core/styles";

export default function getDefaultConfig<T>(theme: Theme): IGraphConfig<T> {
    return {
        automaticRearrangeAfterDropNode: false,
        collapsible: false,
        directed: false,
        focusZoom: 1,
        focusAnimationDuration: 0.75,
        height: 400,
        nodeHighlightBehavior: true,
        linkHighlightBehavior: true,
        highlightDegree: 1,
        highlightOpacity: 1,
        maxZoom: 2,
        minZoom: 0.5,
        panAndZoom: true,
        staticGraph: false, // not working when true
        staticGraphWithDragAndDrop: false, // not working true
        // d3: {
        //     alphaTarget: 0.05,
        //     gravity: -200,
        //     linkLength: 100
        //     // linkStrength: 1 // for some reason this breaks the graph when uncommented
        // },
        node: {
            color: theme.palette.secondary.light,
            fontColor: theme.palette.text.primary,
            fontSize: theme.typography.fontSize,
            fontWeight: "normal",
            highlightColor: theme.palette.secondary.main,
            highlightFontSize: theme.typography.fontSize,
            highlightFontWeight: "bold", // nodeHighlightBehavior and linkHighlightBehavior must be true for this to work
            highlightStrokeColor: "SAME",
            highlightStrokeWidth: 100,
            labelProperty: "id",
            mouseCursor: "pointer",
            opacity: 1,
            renderLabel: true,
            size: 200,
            strokeColor: "none",
            strokeWidth: 1.5,
            svg: "",
            symbolType: "circle",
            viewGenerator: null
        },
        link: {
            color: theme.palette.grey[200],
            fontColor: theme.palette.text.primary,
            fontSize: theme.typography.fontSize,
            fontWeight: "normal",
            highlightColor: theme.palette.grey[400],
            highlightFontSize: theme.typography.fontSize,
            highlightFontWeight: "bold", // nodeHighlightBehavior and linkHighlightBehavior must be true for this to work
            labelProperty: "id",
            mouseCursor: "default",
            opacity: 1,
            renderLabel: false,
            semanticStrokeWidth: false,
            strokeWidth: 1.5,
            type: "STRAIGHT"
        }
    };
}
