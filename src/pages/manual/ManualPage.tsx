import React from "react";

import Grid from "@material-ui/core/Grid";
import GetApp from "@material-ui/icons/GetApp";
import IconButton from "@material-ui/core/IconButton";

import PageContent from "../../components/layout/PageContent";
import MacroscopeLogo from "../../components/images/MacroscopeLogo";

import Section from "./components/Section";
import Text from "../../components/typography/Text";
import List from "../../components/typography/List";
import Image from "../../components/images/Image";
import Note from "../../components/typography/Note";

const manualImageDirectory = "/images/manual";

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

                {/* 
                    -------- METHODOLOGY --------
                    Describe an outline of the source of the data, how it's been processed and how the results are calcuated
                */}

                {/* <Text>
                    By computing cosine similarity between two word vectors (i.e. comparing contexts
                    of words) semantic similarity can be quantified from 0 (not similar at all) to 1
                    (identical).
                </Text>
                <Text>
                    We constructed the Google Ngram Corpus into a large co-occurrence matrix - each
                    word is represented by a vector that contains the co-occurrence information with
                    all other words in the vocabulary of 50,000 words. By transforming count-based
                    co-occurrence to pointwise mutual information (PMI) and regularizing data using
                    singular value decomposition, we constructed diachronic word vectors across 200
                    years.
                </Text> */}

                {/* -------- METHODOLOGY END -------- */}

                {/* Analyses tools */}
                <Sentiment />
                <Frequency />
                <SynonymList />
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
            <Text>
                The Macroscope is a powerful tool built to interpret historical structure of
                language. It is designed to provide comprehensive analyses of historical meaning
                with the click of a button. This enables quick insights for a curious explorer,
                requiring little to no knowledge of linguistics. At the same time, the function to
                download the raw data of any figure caters to researchers, content creators or
                specialists who don't want to design their own solutions from scratch.
            </Text>
            <Text>
                We offer a suite of {numberOfPackages} analytical packages, each explaining a
                different piece of the puzzle. The analyses comes with predefined settings to work
                out of the box. Where possible, the cogs are exposed to the user allowing for the
                finetuning of parameters.
            </Text>
        </Section>
    );
}

function QuickStartGuide() {
    return (
        <Section title="Quick-Start Guide">
            <Text>
                You can use the tool immediately by entering a word in the search bar on the "Word
                Analysis" page. This will perform "Sentiment" and "Frequency" analyses with the
                default settings.
            </Text>
            <>
                <Text variant="subtitle2">
                    You can use the steps below to perform more detailed analyses.
                </Text>

                <List
                    items={[
                        <>
                            Whilst on the "Word Analysis" page, enable the analyses you are
                            interested in by toggling the analyses switches in the settings bar on
                            the left.
                        </>,
                        <>Input a word into the search bar and press enter to trigger a search.</>,
                        <>
                            Your request will be sent to our api, which will process the request and
                            return the result.
                        </>,
                        <>
                            The result will be displayed in a meaningful way so that you can do your
                            analysis! You can export the results of any given analysis by clicking
                            the
                            <IconButton size="small" color="secondary" component="span">
                                <GetApp />
                            </IconButton>
                            icon in the bottom right of the analysis result panel.
                        </>
                    ]}
                    ordered
                />
            </>
            <Text>
                It is recommended to try analysing words with the default settings then tweaking the
                settings where necessary. Many of the settings will have optimal values on a case by
                case basis (e.g. the similarity thresholds of networks). A setting that works for
                the word "risk" may not be ideal for a less frequent word like "bitter".
            </Text>
        </Section>
    );
}

function ConceptualFramework() {
    return (
        <Section title="Conceptual Framework">
            <>
                <Text>
                    The Macroscope provides researchers with the ability to examine two distinct but
                    related aspects of linguistic change in individual words over historical time.
                </Text>
                <List
                    items={[
                        <>
                            Diachronic word embeddings, computed from the co-occurrence matrix,
                            enables us to discover words that are semantically similar to a given
                            word for a given year (i.e. the semantic or synonym structure
                            surrounding a word). These semantically related words are referred to as
                            synonyms.
                        </>,
                        <>
                            The co-occurrence matrix also provides information regarding the context
                            of a given word at a given year. Words that co-occur with the target
                            word are referred to as context words.
                        </>
                    ]}
                    ordered
                />
            </>
            <Text>
                Hence, the Macroscope can be used to examine the semantic (synonym) and contextual
                (co-occurrence) structure of individual words for a specific year and over
                historical time.
            </Text>
            <Image
                src={`${manualImageDirectory}/synchronic-diachronic-analysis.png`}
                alt="synchronic-diachronic-analysis"
            />
        </Section>
    );
}

function Sentiment() {
    return (
        <Section title="Sentiment">
            <Text>This section needs review.</Text>
        </Section>
    );
}

function Frequency() {
    return (
        <Section title="Frequency">
            <Text>
                The frequency chart shows the frequency in which the target word was used in a given
                year.
            </Text>
        </Section>
    );
}

function SynonymList() {
    return (
        <Section title="Synonym list">
            <Text>
                The synonym list displays words that are used in a similar context to the target
                word. Synonyms are identified by finding out which word vectors are most similar to
                the target word vector.
            </Text>
        </Section>
    );
}

function SynonymNetwork() {
    return (
        <Section title="Synonym Network">
            <Text>The synonym network enables the study of semantically similar words.</Text>
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
            <Text>
                The context network allows the visualisation of contextual structures of a word in a
                given year.
            </Text>
            <Text>
                Contextual structure reveals both number of sense and contextual diversity. These
                two concepts partially overlap but are not identical. For example, the example
                network shows although the word gay was used in the sense of homosexuality
                consistently across contexts in year 2000, it appeared in a number of distinctive
                contexts, including homosexuality, political movement on gender equality,
                association with HIV, and academic interests in gender study. Set the year to 1850
                to see how contextual structure of gay changes dramatically.
            </Text>
            <Image
                src={`${manualImageDirectory}/context-network-gay-2000.png`}
                alt="context-network-gay-2000"
                size={512}
            />
            <Text>
                Edges (links): A link between two nodes suggests the pointwise mutual information
                (PMI) value between the two words is greater than the selected threshold (the
                default value is 3).
            </Text>
            <Text>
                Color: The colors represent the community structure of nodes in the network and each
                community is represented with a different color. Communities are sub-groupings of
                nodes that are more likely to be connected to each other than to other nodes within
                the network.
            </Text>
            <Text>
                Size: The size of nodes maps to the co-occurrence frequency between that word and
                the target word (in this example, gay). The size of the target word is manually set
                to be large enough to be visible.
            </Text>
            <Note>
                Note: Community structures of the network are detected using an algorithm introduced
                by Blondel et al (2008) based on modularity optimization that uses an iterative
                process which defines each node as a community at the first step and merges them
                until modularity (a measure of the strength of the communities) is optimized.
            </Note>
        </Section>
    );
}

function SemanticDrift() {
    return (
        <Section title="Semantic Drift">
            <Text>This chart shows the drift of a word in semantic space.</Text>
            <Image
                src={`${manualImageDirectory}/semantic-drift.png`}
                alt="semantic-drift"
                size={512}
            />
            <Text>
                You can visualize semantic drift of a word over a specified historical period. The
                example on the left shows how the word gay changed its meaning from 1850 to 2000.
                The semantic space of gay is defined by its top-k (k=15 by default) synonyms in 1850
                and 2000. The longer the path indicates greater semantic change.
            </Text>
            <Note>Tip: In case the annotations overlap with one and another, you can zoom in.</Note>
        </Section>
    );
}

function ContextChange() {
    return (
        <Section title="Context Change">
            <Text>
                The context change chart displays the context words whose co-occurrence with the
                target word increased and decreased the most over a given time frame.
            </Text>
            <Image
                src={`${manualImageDirectory}/context-change.png`}
                alt="context-change"
                size={512}
            />
            <Note>
                Please note that the axes on the increase domain and decrease domain are scaled
                independently so that two domains occupy the same amount of space in canvas.
            </Note>
        </Section>
    );
}
