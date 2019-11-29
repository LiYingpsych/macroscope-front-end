import red from "@material-ui/core/colors/red";
import pink from "@material-ui/core/colors/pink";
import purple from "@material-ui/core/colors/purple";
import deepPurple from "@material-ui/core/colors/deepPurple";
import indigo from "@material-ui/core/colors/indigo";
import blue from "@material-ui/core/colors/blue";
import lightBlue from "@material-ui/core/colors/lightBlue";
import cyan from "@material-ui/core/colors/cyan";
import teal from "@material-ui/core/colors/teal";
import green from "@material-ui/core/colors/green";
import lightGreen from "@material-ui/core/colors/lightGreen";
import lime from "@material-ui/core/colors/lime";
import yellow from "@material-ui/core/colors/yellow";
import amber from "@material-ui/core/colors/amber";
import orange from "@material-ui/core/colors/orange";
import deepOrange from "@material-ui/core/colors/deepOrange";
import brown from "@material-ui/core/colors/brown";
import grey from "@material-ui/core/colors/grey";
import blueGrey from "@material-ui/core/colors/blueGrey";
import { Color } from "@material-ui/core";
import IColour, { IColourOptions } from "./IColour";
import convertToColour from "./convertToColour";

interface IOptions extends IColourOptions {
    intersectionDotShade?: keyof Color;
}

interface IChartColour extends IColour {
    intersectionDot: string;
}

function convertToChartColour(colour: Color, options?: IOptions): IChartColour {
    const defaultMainShade = 700;
    const defaultHoverShade = 500;
    const defaultIntersectionDotShade = 900;

    const parsedOptions: IOptions =
        typeof options === "undefined"
            ? {
                  mainShade: defaultMainShade,
                  hoverShade: defaultHoverShade,
                  intersectionDotShade: defaultIntersectionDotShade
              }
            : options;

    const intersectionDotShade =
        typeof parsedOptions.intersectionDotShade === "undefined"
            ? defaultIntersectionDotShade
            : parsedOptions.intersectionDotShade;

    return {
        ...convertToColour(colour, parsedOptions),
        intersectionDot: colour[intersectionDotShade]
    };
}

const chartColours: IChartColour[] = [
    convertToChartColour(blueGrey, { mainShade: 800 }),
    convertToChartColour(deepOrange),
    convertToChartColour(amber),
    convertToChartColour(cyan),
    convertToChartColour(blue),
    convertToChartColour(purple),
    convertToChartColour(orange),
    convertToChartColour(teal),
    convertToChartColour(green),
    convertToChartColour(pink),
    convertToChartColour(lime),
    convertToChartColour(deepPurple),
    convertToChartColour(indigo),
    convertToChartColour(yellow),
    convertToChartColour(lightBlue),
    convertToChartColour(lightGreen),
    convertToChartColour(red),
    convertToChartColour(brown),
    convertToChartColour(grey)
];

export default chartColours;
