import React from "react";
import Grid from "@material-ui/core/Grid";
import { useTheme } from "@material-ui/core/styles";

import PersonPanel, { IPerson } from "./PersonPanel";
import FeedbackPanel from "./FeedbackPanel";
import PageContent from "components/layout/PageContent";
import NewTabLink from "components/links/NewTabLink";

export default function ContactUsPage() {
    const theme = useTheme();

    const profileImageFolderLocation = `${process.env.PUBLIC_URL}/images/profile`;
    const peopleData: IPerson[] = [
        {
            avatarImgSource: `${profileImageFolderLocation}/li.png`,
            name: "Li Ying",
            description:
                "A 3rd year PhD student at the University of Warwick interested in quantitative approach to language, decision making and wellbeing. Previous work involves using language data to understand experience of emotions, search in memory space, attitudes towards immigrant groups, a cultural history of risk and historical change in language structure.",
            email: "ying.li@warwick.ac.uk"
        },
        {
            avatarImgSource: `${profileImageFolderLocation}/tomas.png`,
            name: "Tomas Engelthaler",
            description: (
                <span>
                    A cognitive psychologist with a passion for software development. He creates
                    data solutions to answer specific questions about human psychology. These range
                    from improving pilot communication, to designing new GDP metrics or describing
                    historical language use patterns. A recent publication{" "}
                    <NewTabLink href="https://www.researchgate.net/publication/318437295_Humor_norms_for_4997_English_words">
                        (Humor norms for 4,997 English words)
                    </NewTabLink>{" "}
                    has been picked up by over 50 news outlets world wide.
                </span>
            ),
            email: "t.engelthaler@warwick.ac.uk",
            websiteUrl: "https://uk.linkedin.com/in/tomas-engelthaler-882b50b7"
        },
        {
            avatarImgSource: `${profileImageFolderLocation}/cynthia.png`,
            name: "Cynthia Siew",
            description:
                "A psycholinguist and cognitive scientist who is enthusiastic about applying network science approaches to study the structure of the mental lexicon and how that structure affects the way people process spoken and written language.",
            email: "cynsiewsq@gmail.com",
            websiteUrl: "https://csqsiew.netlify.com/"
        },
        {
            avatarImgSource: `${profileImageFolderLocation}/thomas.png`,
            name: "Thomas Hills",
            description: (
                <span>
                    Director of the{" "}
                    <NewTabLink href="https://warwick.ac.uk/fac/cross_fac/bridges">
                        Bridges-Leverhulme Doctoral Training Centre
                    </NewTabLink>
                    . Interested in quantitative approaches to language, wellbeing, memory, and
                    decision making. Research involves using 'big data' to understand psychological
                    change over cultural time; understanding language learning using network
                    analysis; computational modelling of memory representations and age-related
                    cognitive decline; and information search in decision making.
                </span>
            ),
            email: "t.t.hills@warwick.ac.uk",
            websiteUrl: "https://warwick.ac.uk/fac/sci/psych/people/thills/"
        }
    ];

    return (
        <PageContent>
            <FeedbackPanel style={{ marginBottom: theme.spacing(2) }} />
            <Grid container justify="center" spacing={2}>
                {peopleData.map((person, i) => (
                    <Grid item key={i}>
                        <PersonPanel person={person} />
                    </Grid>
                ))}
            </Grid>
        </PageContent>
    );
}
