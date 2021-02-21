import React, { useEffect, useMemo } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Skeleton from '@material-ui/lab/Skeleton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Chip from '@material-ui/core/Chip';

import { AddCircleOutline as AddCircleIcon } from "@styled-icons/material/AddCircleOutline";

import { getMyInformation } from '../../api/getMyInformation';

import Birthday from "../../../assets/img/create_profile/birthday.svg";
import Name from "../../../assets/img/create_profile/name.svg";
import Progress from "../../../assets/img/create_profile/progress.svg";
import KidsloopIcon from "../../../assets/img/kidsloop_icon.svg";
import { getMyUsers, myUserSampleResponse } from '../../api/getMyUsers';
import { User } from '../../api/queries/me';
import { utils } from 'kidsloop-px';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => ({
    imgHeader: {
        width: "60%",
        padding: theme.spacing(4, 0),
        [theme.breakpoints.down("xs")]: {
            width: "40%",
        },
    },
    textSpacing: {
        padding: theme.spacing(0, 2),
        [theme.breakpoints.down("xs")]: {
            padding: 0,
        },
    },
    title: {
        color: "#000",
    },
    column: {
        flexBasis: '33.33%',
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    details: {
        alignItems: 'center',
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}));

export default function SetOrganization() {
    const classes = useStyles();
    const history = useHistory();
    const theme = useTheme();
    const [expanded, setExpanded] = useState<string | false>(false);
    const [users, setUsers] = useState<User[]>([]);

    const { loading, data } = getMyUsers();

    const { url, uaParam } = useMemo(() => {
        const url = new URL(window.location.href);
        console.log("url", url);
        const uaParam = url.searchParams.get("ua");
        console.log(uaParam);

        return { url, uaParam };
    }, [])

    useEffect(() => {
        if (url.hostname === "0.0.0.0" || url.hostname === "localhost") {
            setUsers(myUserSampleResponse.my_users);
            setExpanded(myUserSampleResponse.my_users[0].user_id);
            return;
        } else if (data) {
            console.log("useEffect my users: ", data);
            setUsers(data.my_users);
            setExpanded(data.my_users[0].user_id);
        }
    }, [data])

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    }

    return (
        <>
            <Grid item style={{ textAlign: "center" }}>
                <img src={Name} className={classes.imgHeader} />
            </Grid>
            <Grid item>
                <Typography variant="h4" align="center">
                    Select an organization.
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="subtitle2" align="center" className={classes.textSpacing}>
                    Your new learner will be part of an organization that you are already in. An admin or teacher will need to accept your new learner's application after these three easy steps.
                </Typography>
            </Grid>
            <div style={{ height: theme.spacing(2) }}/>
            <Grid
                container
                item
                direction="row"
                justify="center"
                spacing={1}
            >
                <Grid item xs={12} style={{ paddingLeft: 0, paddingRight: 0 }}>
                    { users.map((user) => 
                        <Accordion 
                            expanded={expanded === user.user_id} 
                            onChange={handleChange(user.user_id)}
                            key={user.user_id}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1c-content"
                                id="panel1c-header"
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justify="flex-start"
                                    alignItems="center"
                                    spacing={1}
                                >
                                    <Grid item>
                                        <Avatar 
                                            style={{ 
                                                backgroundColor: utils.stringToColor(user.given_name + " " + user.family_name),
                                                color: "white"
                                            }}
                                        >
                                            <Typography variant="caption">
                                                { utils.nameToInitials(user.given_name + " " + user.family_name, 3) }
                                            </Typography>
                                        </Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Typography>
                                            { user.given_name + " " + user.family_name}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </AccordionSummary>
                            <AccordionDetails className={classes.details}>
                                <List>
                                    <ListItem>
                                        
                                    </ListItem>
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    )}
                </Grid>
            </Grid>
        </>
    );
}
