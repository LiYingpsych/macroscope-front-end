import { Color } from "@material-ui/core";

export default interface IColour {
    main: string;
    hover: string;
}

export interface IColourOptions {
    mainShade?: keyof Color;
    hoverShade?: keyof Color;
}
