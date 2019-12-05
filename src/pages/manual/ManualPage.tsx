import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import GetApp from "@material-ui/icons/GetApp";
import IconButton from "@material-ui/core/IconButton";

import PageContent from "../../components/layout/PageContent";
import MacroscopeLogo from "../../components/images/MacroscopeLogo";
import List from "./components/List";
import Section from "./components/Section";

export default function ManualPage() {
    return (
        <PageContent>
            <Grid container direction="column" spacing={2}>
                <Grid container justify="center" item xs={12}>
                    <Grid item>
                        <MacroscopeLogo size={300} />
                    </Grid>
                </Grid>
                <Intro />
                <QuickStartGuide />
                <ConceptualFramework />
            </Grid>
        </PageContent>
    );
}

function Intro() {
    const numberOfPackages = 7;

    return (
        <Section title="Intro">
            <Typography>
                The Macroscope is a powerful tool built to interpret historical structure of
                language. It is designed to provide comprehensive analyses of historical meaning
                with the click of a button. This enables quick insights for a curious explorer,
                requiring little to no knowledge of linguistics. At the same time, the function to
                download the raw data of any figure caters to researchers, content creators or
                specialists who don't want to design their own solutions from scratch.
            </Typography>
            <Typography>
                We offer a suite of {numberOfPackages} analytical packages, each explaining a
                different piece of the puzzle. The analyses comes with predefined settings to work
                out of the box. Where possible, the cogs are exposed to the user allowing for the
                finetuning of parameters.
            </Typography>
        </Section>
    );
}

function QuickStartGuide() {
    return (
        <Section title="Quick-Start Guide">
            <Typography>
                You can use the tool immediately by entering a word in the search bar on the "Word
                Analysis" page. This will perform "Sentiment" and "Frequency" analyses with the
                default settings.
            </Typography>
            <>
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
            </>
            <Typography>
                It is recommended to try analysing words with the default settings then tweaking the
                settings where necessary. Many of the settings will have optimal values on a case by
                case basis (e.g. the similarity thresholds of networks). A setting that works for
                the word "risk" may not be ideal for a less frequent word like "bitter".
            </Typography>
        </Section>
    );
}

function ConceptualFramework() {
    return (
        <Section title="Conceptual Framework">
            <Typography>
                The Macroscope provides researchers with the ability to examine two distinct but
                related aspects of linguistic change in individual words over historical time.
                <List
                    items={[
                        <Typography>
                            Diachronic word embeddings, computed from the co-occurrence matrix,
                            enables us to discover words that are semantically similar to a given
                            word for a given year (i.e. the semantic or synonym structure
                            surrounding a word). These semantically related words are referred to as
                            synonyms.
                        </Typography>,
                        <Typography>
                            The co-occurrence matrix also provides information regarding the context
                            of a given word at a given year. Words that co-occur with the target
                            word are referred to as context words.
                        </Typography>
                    ]}
                    ordered
                />
            </Typography>
            <Typography>
                Hence, the Macroscope can be used to examine the semantic (synonym) and contextual
                (co-occurrence) structure of individual words for a specific year and over
                historical time.
            </Typography>
        </Section>
    );
}
