import red from "@material-ui/core/colors/red";
import pink from "@material-ui/core/colors/pink";
import purple from "@material-ui/core/colors/purple";
import deepPurple from "@material-ui/core/colors/deepPurple";
import indigo from "@material-ui/core/colors/indigo";
import blue from "@material-ui/core/colors/blue";
import lightBlue from "@material-ui/core/colors/lightBlue";
import cyan from "@material-ui/core/colors/cyan";
import green from "@material-ui/core/colors/green";
import lightGreen from "@material-ui/core/colors/lightGreen";
import lime from "@material-ui/core/colors/lime";
import yellow from "@material-ui/core/colors/yellow";
import amber from "@material-ui/core/colors/amber";
import orange from "@material-ui/core/colors/orange";
import deepOrange from "@material-ui/core/colors/deepOrange";
import { Color } from "@material-ui/core";
import IColour, { IColourOptions } from "./IColour";
import convertToColour from "./convertToColour";

interface IOptions extends IColourOptions {}

function convertToNetworkGraphColour(colour: Color, options?: IOptions): IColour {
    const defaultMainShade = 500;
    const defaultHoverShade = 700;

    const parsedOptions: IOptions =
        typeof options === "undefined"
            ? {
                  mainShade: defaultMainShade,
                  hoverShade: defaultHoverShade
              }
            : options;

    return {
        ...convertToColour(colour, parsedOptions)
    };
}

const rainbowColours: IColour[] = [
    convertToNetworkGraphColour(red),
    convertToNetworkGraphColour(deepOrange),
    convertToNetworkGraphColour(orange),

    convertToNetworkGraphColour(amber),
    convertToNetworkGraphColour(yellow),
    convertToNetworkGraphColour(lime),

    convertToNetworkGraphColour(lightGreen),
    convertToNetworkGraphColour(green),
    convertToNetworkGraphColour(cyan),

    convertToNetworkGraphColour(lightBlue),
    convertToNetworkGraphColour(blue),
    convertToNetworkGraphColour(indigo),

    convertToNetworkGraphColour(deepPurple),
    convertToNetworkGraphColour(purple),
    convertToNetworkGraphColour(pink)
];

export default rainbowColours;
