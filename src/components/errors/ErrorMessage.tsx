import React, { useState } from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import SnackBarContentWrapper from "../SnackBarContentWrapper";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        errorMessage: {
            color: theme.palette.error.main
        }
    })
);

interface IProps {
    message?: string;
    snackbar?: boolean;
}

export default function ErrorMessage(props: IProps) {
    const classes = useStyles();

    const { message = "An error occured", snackbar = false } = props;

    const [isOpen, setIsOpen] = useState(snackbar);

    return (
        <>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                open={isOpen}
                message={<Typography>{message}</Typography>}
            >
                <SnackBarContentWrapper
                    variant="error"
                    message={message}
                    onClose={() => {
                        setIsOpen(false);
                    }}
                />
            </Snackbar>
            {snackbar ? null : <Typography className={classes.errorMessage}>{message}</Typography>}
        </>
    );
}
