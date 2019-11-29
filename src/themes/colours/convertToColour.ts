import { Color } from "@material-ui/core";
import IColour, { IColourOptions } from "./IColour";

export default function convertToColour(colour: Color, options?: IColourOptions): IColour {
    const defaultMainShade = 700;
    const defaultHoverShade = 500;

    const parsedOptions: IColourOptions =
        typeof options === "undefined"
            ? {
                  mainShade: defaultMainShade,
                  hoverShade: defaultHoverShade
              }
            : options;

    const mainShade =
        typeof parsedOptions.mainShade === "undefined" ? defaultMainShade : parsedOptions.mainShade;
    const hoverShade =
        typeof parsedOptions.hoverShade === "undefined"
            ? defaultHoverShade
            : parsedOptions.hoverShade;

    return {
        main: colour[mainShade],
        hover: colour[hoverShade]
    };
}
