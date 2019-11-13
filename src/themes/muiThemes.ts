import { createMuiTheme, Theme } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import deepOrange from "@material-ui/core/colors/deepOrange";
import red from "@material-ui/core/colors/red";
import blueGrey from "@material-ui/core/colors/blueGrey";

const defaultTheme: Theme = createMuiTheme({
    palette: {
        primary: {
            ...blueGrey,
            main: blueGrey[800]
        },
        secondary: deepOrange,
        error: {
            ...red,
            light: "#e5737321"
        }
    },
    overrides: {
        MuiLinearProgress: {
            barColorPrimary: {
                backgroundColor: indigo["800"]
            }
        }
    }
});

export default { defaultTheme: defaultTheme };
