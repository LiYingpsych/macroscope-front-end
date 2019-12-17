import React, { SyntheticEvent, ReactNode } from "react";
import Snackbar, { SnackbarProps } from "@material-ui/core/Snackbar";
import SnackbarContentWrapper, { SnackBarVariant } from "./SnackbarContentWrapper";
import OmitType from "../../utils/OmitType";

interface IProps extends OmitType<SnackbarProps, "open"> {
    variant?: SnackBarVariant;
    defaultIsOpen?: boolean;
    message?: ReactNode;
}

export default function GenericSnackBar(props: IProps) {
    const { message = "", variant = "info", defaultIsOpen = false } = props;

    const [open, setOpen] = React.useState(defaultIsOpen);
    const handleClose = (event?: SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    return (
        <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
            }}
            open={open}
            onClose={handleClose}
        >
            <SnackbarContentWrapper onClose={handleClose} variant={variant} message={message} />
        </Snackbar>
    );
}
