import React, { ReactNode } from "react";
import clsx from "clsx";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import { amber, green } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import SnackbarContent, { SnackbarContentProps } from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import { makeStyles, Theme } from "@material-ui/core/styles";

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon
};

const useStyles = makeStyles((theme: Theme) => ({
    root: { flexWrap: "unset" },
    success: {
        backgroundColor: green[600]
    },
    error: {
        backgroundColor: theme.palette.error.dark
    },
    info: {
        backgroundColor: theme.palette.primary.main
    },
    warning: {
        backgroundColor: amber[700]
    },
    icon: {
        fontSize: 20
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1)
    },
    message: {
        display: "flex",
        alignItems: "center"
    }
}));

export type SnackBarVariant = keyof typeof variantIcon;

export interface IProps extends SnackbarContentProps {
    className?: string;
    message?: ReactNode;
    onClose?: () => void;
    variant: SnackBarVariant;
}

export default function SnackbarContentWrapper(props: IProps) {
    const classes = useStyles();
    const { className, message, onClose, variant, ...rest } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            classes={{
                root: classes.root
            }}
            className={clsx(classes[variant], className)}
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={clsx(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={[
                <IconButton key="close" color="inherit" onClick={onClose}>
                    <CloseIcon className={classes.icon} />
                </IconButton>
            ]}
            {...rest}
        />
    );
}
