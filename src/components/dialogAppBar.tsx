import config from "../config";
import PrimaryLogo from "@branding/assets/img/primary_logo.svg";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import {
    createStyles,
    makeStyles,
    Theme,
} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: `relative`,
        },
        title: {
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(1),
        },
    }));

interface Props {
    handleClose: () => void;
    subtitleID?: string;
    titleID?: string;
    toolbarBtn?: React.ReactNode;
}

export default function DialogAppBar (props: Props) {
    const classes = useStyles();
    const {
        handleClose,
        subtitleID,
        titleID,
        toolbarBtn,
    } = props;

    return (
        <>
            <AppBar
                color="inherit"
                className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="close"
                        onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <Grid
                        container
                        item
                        wrap="nowrap">
                        <img
                            alt={`${config.branding.company.name} Logo`}
                            className={classes.title}
                            src={PrimaryLogo}
                            height={32} />
                        <Typography
                            id="nav-menu-title"
                            variant="h6">
                            {titleID}
                        </Typography>
                    </Grid>
                    { toolbarBtn ? toolbarBtn : null }
                </Toolbar>
            </AppBar>
            { subtitleID ?
                <Grid
                    container
                    direction="row"
                >
                    <Paper
                        square
                        style={{
                            flex: 1,
                            height: `100%`,
                        }}>
                        <Toolbar variant="dense">
                            <Typography
                                id="nav-menu-description"
                                variant="body2">
                                <FormattedMessage id={subtitleID} />
                            </Typography>
                        </Toolbar>
                    </Paper>
                </Grid> : null
            }
        </>
    );
}
