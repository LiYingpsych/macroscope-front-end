import React, { ReactNode } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Switch from "@material-ui/core/Switch";
import ListItemText from "@material-ui/core/ListItemText";
import Container from "@material-ui/core/Container";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap"
        },
        list: {
            width: "100%",
            padding: "0px"
        }
    })
);

interface IProps {
    label: string;
    children?: ReactNode;
}

export default function SwitchExpansionPanel(props: IProps) {
    const classes = useStyles();

    const { label, children } = props;

    const [isOpen, setIsOpen] = React.useState(false);
    const toggleSwitch = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={classes.root}>
            <List className={classes.list}>
                <ListItem button onClick={toggleSwitch}>
                    <ListItemText primary={label} />
                    <Switch checked={isOpen} />
                </ListItem>
            </List>
            {children ? (
                <Collapse in={isOpen}>
                    <Container>{children}</Container>
                </Collapse>
            ) : null}
        </div>
    );
}
