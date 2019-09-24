import { createMuiTheme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import deepOrange from "@material-ui/core/colors/deepOrange";
import red from "@material-ui/core/colors/red";

export const theme = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: deepOrange,
        error: red
    },
    overrides: {
        MuiLinearProgress: {
            barColorPrimary: {
                backgroundColor: indigo["800"]
            }
        }
    }
});
