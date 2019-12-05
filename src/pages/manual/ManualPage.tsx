import React from "react";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import PageContent from "../../components/layout/PageContent";
import MacroscopeLogo from "../../components/images/MacroscopeLogo";
import List from "../../components/typography/List";
import GetApp from "@material-ui/icons/GetApp";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(() =>
    createStyles({
        gridItem: {
            width: "100%"
        }
    })
);

export default function ManualPage() {
    const classes = useStyles();

    return (
        <PageContent>
            <Grid container direction="column" spacing={2}>
                <Grid container justify="center" item xs={12} className={classes.gridItem}>
                    <Grid item>
                        <MacroscopeLogo size={300} />
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.gridItem}>
                    <Intro />
                </Grid>
                <Grid item xs={12} className={classes.gridItem}>
                    <QuickStartGuide />
                </Grid>

                <Grid item xs={12} className={classes.gridItem}>
                    <ConceptualFramework />
                </Grid>
            </Grid>
        </PageContent>
    );
}

function Intro() {
    const numberOfPackages = 7;

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
                <Typography>
                    The Macroscope is a powerful tool built to interpret historical structure of
                    language. It is designed to provide comprehensive analyses of historical meaning
                    with the click of a button. This enables quick insights for a curious explorer,
                    requiring little to no knowledge of linguistics. At the same time, the function
                    to download the raw data of any figure caters to researchers, content creators
                    or specialists who don't want to design their own solutions from scratch.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    We offer a suite of {numberOfPackages} analytical packages, each explaining a
                    different piece of the puzzle. The analyses comes with predefined settings to
                    work out of the box. Where possible, the cogs are exposed to the user allowing
                    for the finetuning of parameters.
                </Typography>
            </Grid>
        </Grid>
    );
}

function QuickStartGuide() {
    return (
        <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4">Quick-Start Guide</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    You can use the tool immediately by entering a word in the search bar on the
                    "Word Analysis" page. This will perform "Sentiment" and "Frequency" analyses
                    with the default settings.
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant="subtitle2">
                    You can use the steps below to perform more detailed analyses.
                </Typography>
                <List
                    items={[
                        <Typography>
                            Whilst on the "Word Analysis" page, enable the analyses you are
                            interested in by toggling the analyses switches in the settings bar on
                            the left.
                        </Typography>,
                        <Typography>
                            Input a word into the search bar and press enter to trigger a search.
                        </Typography>,
                        <Typography>
                            Your request will be sent to our api, which will process the request and
                            return the result.
                        </Typography>,
                        <Typography>
                            The result will be displayed in a meaningful way so that you can do your
                            analysis! You can export the results of any given analysis by clicking
                            the
                            <IconButton size="small" color="primary" component="span">
                                <GetApp />
                            </IconButton>
                            icon in the bottom right of the analysis result panel.
                        </Typography>
                    ]}
                    ordered
                />
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    It is recommended to try analysing words with the default settings then tweaking
                    the settings where necessary. Many of the settings will have optimal values on a
                    case by case basis (e.g. the similarity thresholds of networks). A setting that
                    works for the word "risk" may not be ideal for a less frequent word like
                    "bitter".
                </Typography>
            </Grid>
        </Grid>
    );
}

function ConceptualFramework() {
    return (
        <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4">Conceptual Framework</Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    The Macroscope provides researchers with the ability to examine two distinct but
                    related aspects of linguistic change in individual words over historical time.
                    <List
                        items={[
                            <Typography>
                                Diachronic word embeddings, computed from the co-occurrence matrix,
                                enables us to discover words that are semantically similar to a
                                given word for a given year (i.e. the semantic or synonym structure
                                surrounding a word). These semantically related words are referred
                                to as synonyms.
                            </Typography>,
                            <Typography>
                                The co-occurrence matrix also provides information regarding the
                                context of a given word at a given year. Words that co-occur with
                                the target word are referred to as context words.
                            </Typography>
                        ]}
                        ordered
                    />
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography>
                    Hence, the Macroscope can be used to examine the semantic (synonym) and
                    contextual (co-occurrence) structure of individual words for a specific year and
                    over historical time.
                </Typography>
            </Grid>
        </Grid>
    );
}
