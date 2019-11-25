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

type IShadeNumber = "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";

interface IOptions {
    main?: IShadeNumber;
    hover?: IShadeNumber;
}

interface IChartColour {
    main: string;
    hover: string;
}

function convertToChartColour(colour: Color, options?: IOptions) {
    const defaultMainShade = "700";
    const defaultHoverShade = "900";

    const parsedOptions: IOptions =
        typeof options === "undefined"
            ? { main: defaultMainShade, hover: defaultHoverShade }
            : options;
    return {
        main:
            colour[
                typeof parsedOptions.main === "undefined" ? defaultMainShade : parsedOptions.main
            ],
        hover:
            colour[
                typeof parsedOptions.hover === "undefined" ? defaultHoverShade : parsedOptions.hover
            ]
    };
}

export const chartColours: IChartColour[] = [
    convertToChartColour(blueGrey, { main: "800", hover: "500" }),
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
