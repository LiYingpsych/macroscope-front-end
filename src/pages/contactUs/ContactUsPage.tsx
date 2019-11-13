import React from "react";
import PersonPanel, { IPerson } from "./PersonPanel";
import Grid from "@material-ui/core/Grid";
import PageContent from "../../components/PageContent";

export default function ContactUsPage() {
    const profileImageFolderLocation = `${process.env.PUBLIC_URL}/profileImages`;
    const peopleData: IPerson[] = [
        {
            avatarImgSource: `${profileImageFolderLocation}/li.png`,
            name: "Li Ying",
            description:
                "Li Ying is a 3rd year PhD student at the University of Warwick. He is interested in quantitative approach to language, decision making and wellbeing. His previous work involves using language data to understand experience of emotions, search in memory space, attitudes towards immigrant groups, a cultural history of risk and historical change in language structure.",
            email: "ying.li@warwick.ac.uk"
        },
        {
            avatarImgSource: `${profileImageFolderLocation}/tomas.png`,
            name: "Tomas Engelthaler",
            description:
                "A cognitive psychologist with a passion for software development. I create data solutions to answer specific questions about human psychology. These range from improving pilot communication, to designing new GDP metrics or describing historical language use patterns. My recent publication (Humor norms for 4,997 English words) has been picked up by over 50 news outlets world wide.",
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
            description:
                "I am interested in quantitative approaches to language, wellbeing, memory, and decision making. My work involves using 'big data' to understand psychological change over cultural time; understanding language learning using network analysis; computational modelling of memory representations and age-related cognitive decline; and information search in decision making.",
            email: "t.t.hills@warwick.ac.uk",
            websiteUrl: "https://warwick.ac.uk/fac/sci/psych/people/thills/"
        }
    ];

    return (
        <PageContent>
            <Grid container justify="center" spacing={2}>
                {peopleData.map((person, i) => (
                    <Grid item>
                        <PersonPanel person={person} key={i} />
                    </Grid>
                ))}
            </Grid>
        </PageContent>
    );
}
