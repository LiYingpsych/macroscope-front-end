import React, { ReactNode } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Switch from "@material-ui/core/Switch";
import ListItemText from "@material-ui/core/ListItemText";
import Container from "@material-ui/core/Container";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import classnames from "classnames";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            border: "1px solid transparent"
        },
        list: {
            width: "100%",
            padding: "0px"
        },
        error: {
            border: `1px solid ${theme.palette.error.main}`
        }
    })
);

interface IProps {
    label: string;
    error?: boolean;
    isOpenDefault?: boolean;
    children?: ReactNode;
    onChange?: (isOpen: boolean) => void;
}

export default function SwitchExpansionPanel(props: IProps) {
    const classes = useStyles();

    const {
        label,
        error = false,
        isOpenDefault = false,
        children,
        onChange = (isOpen: boolean) => {}
    } = props;

    const [isOpen, setIsOpen] = React.useState(isOpenDefault);
    const toggleSwitch = () => {
        const newValue = !isOpen;
        setIsOpen(newValue);
        onChange(newValue);
    };

    const errorClassName = error ? classes.error : "";

    return (
        <div className={classnames(classes.root, errorClassName)}>
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
