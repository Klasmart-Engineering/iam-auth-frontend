import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import {
    Button,
    ButtonBase,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    IconButton,
    useMediaQuery,
    useTheme,
    Theme,
} from "@mui/material";
import { Close as CloseIcon } from '@mui/icons-material';
import { PrivacyPolicy } from "@branding/index";

export const Policy = () => {
    const theme = useTheme<Theme>();
    const [visible, setVisible] = useState<boolean>(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const onOpen = () => setVisible(true);
    const onClose = () => setVisible(false);

    return (
        <>
            <Button
                color="inherit"
                onClick={onOpen}
            >
                <FormattedMessage id="privacy_privacyLink" />
            </Button>
            <Dialog
                open={visible}
                onClose={onClose}
                fullScreen={fullScreen}
            >
                <DialogTitle>
                    Privacy Notice
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[700],
                        }}
                        >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <PrivacyPolicy />
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    );
}