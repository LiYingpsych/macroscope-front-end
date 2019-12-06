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
                <SynonymNetwork />
                <ContextNetwork />
                <SemanticDrift />
                <ContextChange />
            </Grid>
        </PageContent>
    );
}

function Intro() {
    const numberOfPackages = 7;

    return (
        <Section>
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

function SynonymNetwork() {
    return (
        <Section title="Synonym Network">
            <Typography>
                The synonym network enables the study of semantically similar words.
            </Typography>
            {/* <Typography>
                This analysis helps you to understand to what extent two words are semantically
                similar to each other. 
                
                
                Figure on the left (a) shows semantic structure of happy and
                sad. Each nodes represents happy and sad and their top-4 synonyms. Link suggests
                similarity between two words exceed certain threshold (default value is set equal to
                0.6). Despite being antonyms, happy and sad are conceptually associated and
                therefore often appears in similar context. Therefore, the semantic similarity
                inferred from contextual structure would suggest they are semantically similar. But,
                as network suggests, their synonyms are not linked with each other and therefore
                happy and sad are strongly associated but not semantically similar. 
                
                
                One example of
                two words that are truly semantically similar to each other is gay and lesbian, also
                show in the figure on the left (b).
            </Typography> */}
        </Section>
    );
}

function ContextNetwork() {
    return (
        <Section title="Context Network">
            <Typography>
                The context network allows the visualisation of contextual structures of a word in a
                given year.
            </Typography>
            {/* <Typography>
                Contextual structure reveals both number of sense and contextual diversity. These two concepts
                partially overlap but are not identical. For example, the network on the right shows
                although the word gay was used in the sense of homosexuality consistently across
                contexts in year 2000, it appeared in a number of distinctive contexts, including
                homosexuality, political movement on gender equality, association with HIV, and
                academic interests in gender study. Set the year to 1850 to see how contextual
                structure of gay changes dramatically.
            </Typography>
            <Typography>
                Edges (links): A link between two nodes suggests the pointwise mutual information
                (PMI) value between the two words is greater than the selected threshold (the
                default value is 3).
            </Typography>
            <Typography>
                Color: The colors represent the community structure of nodes in the network and each
                community is represented with a different color. Communities are sub-groupings of
                nodes that are more likely to be connected to each other than to other nodes within
                the network.
            </Typography>
            <Typography>
                Size: The size of nodes maps to the co-occurrence frequency between that word and the
                target word (in this example, gay). The size of the target word is manually set to be
                large enough to be visible.
            </Typography>
            <Typography>
                Note: Community structures of the network are detected using an algorithm introduced
                by Blondel et al (2008) based on modularity optimization that uses an iterative
                process which defines each node as a community at the first step and merges them
                until modularity (a measure of the strength of the communities) is optimized.
            </Typography> */}
        </Section>
    );
}

function SemanticDrift() {
    return (
        <Section title="Semantic Drift">
            <Typography>This chart shows the drift of a word in semantic space.</Typography>

            {/* <Typography>
                You can visualize semantic drift of a word over a specified historical period. The
                example on the left shows how the word gay changed its meaning from 1850 to 2000.
                The semantic space of gay is defined by its top-k (k=15 by default) synonyms in 1850
                and 2000. The longer the path indicates greater semantic change.
            </Typography>
            <Typography>
                Tip: In case the annotations overlap with one and another, you can drag to separate
                them.
            </Typography> */}
        </Section>
    );
}

function ContextChange() {
    return (
        <Section title="Context Change">
            <Typography>
                The context change chart displays the context words whose co-occurrence with the
                target word increased and decreased the most over a given time frame.
            </Typography>
            <Typography>
                Please note that the axes on the increase domain and decrease domain are scaled
                independently so that two domains occupy the same amount of space in canvas.
            </Typography>
        </Section>
    );
}
