import React from "react";

// import { makeStyles, createStyles } from "@material-ui/core/styles";
// import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";

import PageContent from "../../components/layout/PageContent";
// import MacroscopeLogo from "../../components/images/MacroscopeLogo";
import ScatterChart from "../../components/victoryCharts/scatterChart/ScatterChart";

// const useStyles = makeStyles(() =>
//     createStyles({
//         gridItem: {
//             width: "100%"
//         }
//     })
// );

const data = [
    {
        x: 0.40900604317951367,
        y: -0.02977242642430437,
        label: "hello (1800)",
        fill: "#ff6e40"
    },
    {
        x: -0.05413390181096295,
        y: -0.10835583201442792,
        label: "hello (1850)",
        fill: "#ff6e40"
    },
    {
        x: -0.397792488531308,
        y: 0.021492176016087952,
        label: "hello (1900)",
        fill: "#ff6e40"
    },
    {
        x: -0.4243601993436001,
        y: 0.06293493950918305,
        label: "hello (1950)",
        fill: "#ff6e40"
    },
    {
        x: -0.43689302839071087,
        y: 0.014644417293637848,
        label: "hello (2000)",
        fill: "#ff6e40"
    },
    {
        x: 0.46632880091697526,
        y: -0.20562133060189172,
        label: "swooping",
        fill: "#90a4ae"
    },
    {
        x: 0.5546108643330748,
        y: -0.2326627073868922,
        label: "gabled",
        fill: "#90a4ae"
    },
    {
        x: 0.5997340627584082,
        y: 0.6875957012265209,
        label: "lacs",
        fill: "#90a4ae"
    },
    {
        x: 0.4394906445114854,
        y: -0.18148237040327014,
        label: "zweig",
        fill: "#90a4ae"
    },
    {
        x: 0.45739257929463983,
        y: -0.2394109025788589,
        label: "harvesters",
        fill: "#90a4ae"
    },
    {
        x: -0.4708077506751218,
        y: 0.027807208153637852,
        label: "hey",
        fill: "#90a4ae"
    },
    {
        x: -0.3537529197103253,
        y: 0.05357261670832227,
        label: "hi",
        fill: "#90a4ae"
    },
    {
        x: -0.4685543536086264,
        y: 0.04559179903317534,
        label: "yeah",
        fill: "#90a4ae"
    },
    {
        x: -0.31353638885126156,
        y: -0.04309922578291521,
        label: "whispered",
        fill: "#90a4ae"
    },
    {
        x: 0.42606219534393425,
        y: -0.3107656371183508,
        label: "partaken",
        fill: "#90a4ae"
    },
    {
        x: 0.5956423759926197,
        y: 0.7269243778801184,
        label: "particulier",
        fill: "#90a4ae"
    },
    {
        x: -0.3178148126735715,
        y: -0.04323061679167647,
        label: "bye",
        fill: "#90a4ae"
    },
    {
        x: 0.4643662054429967,
        y: -0.17518974810841587,
        label: "cappella",
        fill: "#90a4ae"
    },
    {
        x: 0.5096424047553121,
        y: -0.021460667664267245,
        label: "copier",
        fill: "#90a4ae"
    },
    {
        x: -0.4706907703388323,
        y: 0.03238877007104653,
        label: "okay",
        fill: "#90a4ae"
    },
    {
        x: -0.4200759609290689,
        y: 0.012527851707092122,
        label: "sorry",
        fill: "#90a4ae"
    },
    {
        x: -0.41147119205805144,
        y: 0.00784288866824944,
        label: "mama",
        fill: "#90a4ae"
    },
    {
        x: 0.5053422101129674,
        y: -0.16237042380064062,
        label: "subhas",
        fill: "#90a4ae"
    },
    {
        x: -0.43736438109542464,
        y: 0.03811797674108602,
        label: "oh",
        fill: "#90a4ae"
    },
    {
        x: -0.4503702386250608,
        y: 0.021981165667754522,
        label: "yes",
        fill: "#90a4ae"
    }
];

export default function ManualPage() {
    // const classes = useStyles();

    return (
        <PageContent>
            <ScatterChart data={data} />
            {/* <Grid container direction="column" spacing={2}>
                <Grid container justify="center" item xs={12} className={classes.gridItem}>
                    <Grid item>
                        <MacroscopeLogo size={300} />
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.gridItem}>
                    <Intro />
                </Grid>
            </Grid> */}
        </PageContent>
    );
}

// function Intro() {
//     return (
//         <Grid container direction="column" spacing={2}>
//             <Grid item xs={12}>
//                 <Typography>
//                     The Macroscope is a powerful tool built to interpret historical structure of
//                     language. It is designed to provide comprehensive analyses of historical meaning
//                     with the click of a button. This enables quick insights for a curious explorer,
//                     requiring little to no knowledge of linguistics.
//                 </Typography>
//             </Grid>
//             <Grid item xs={12}>
//                 <Typography>We are currently in active development.</Typography>
//             </Grid>
//         </Grid>
//     );
// }
