import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Text from "components/typography/Text";
import NewTabLink from "components/links/NewTabLink";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(2)
        }
    })
);

interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function FeedbackPanel(props: IProps) {
    const classes = useStyles();

    return (
        <div className={classes.root} {...props}>
            <Text>
                We welcome feedback on the site! Please feel free to make a suggestion on how to
                improve the site or to report a bug, by following the{" "}
                <NewTabLink href="https://github.com/StraightOuttaCrompton/macroscope-front-end#bugs-and-enhancement-requests">
                    bugs-and-enhancement-requests
                </NewTabLink>{" "}
                instructions, in the git repository.
            </Text>
        </div>
    );
}
