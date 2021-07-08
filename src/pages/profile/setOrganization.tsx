import Name from "../../../assets/img/create_profile/name.svg";
import {
    getMyUsers,
    myUserSampleResponse,
} from '../../api/getMyUsers';
import { User } from '../../api/queries/me';
import { URLContext } from '../../entry';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {
    makeStyles,
    Theme,
    useTheme,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { utils } from 'kidsloop-px';
import React,
{
    useContext,
    useEffect,
    useState,
} from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    imgHeader: {
        width: `60%`,
        padding: theme.spacing(4, 0),
        [theme.breakpoints.down(`xs`)]: {
            width: `40%`,
        },
    },
    textSpacing: {
        padding: theme.spacing(0, 2),
        [theme.breakpoints.down(`xs`)]: {
            padding: 0,
        },
    },
    title: {
        color: `#000`,
    },
    column: {
        flexBasis: `33.33%`,
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
        alignItems: `center`,
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: `none`,
        '&:hover': {
            textDecoration: `underline`,
        },
    },
}));

export default function SetOrganization () {
    const classes = useStyles();
    const theme = useTheme();
    const url = useContext(URLContext);
    const [ expanded, setExpanded ] = useState<string | false>(false);
    const [ users, setUsers ] = useState<User[]>([]);

    const { data } = getMyUsers();

    useEffect(() => {
        if (url.hostName === `0.0.0.0` || url.hostName === `localhost`) {
            setUsers(myUserSampleResponse.my_users);
            setExpanded(myUserSampleResponse.my_users[0].user_id);
            return;
        } else if (data) {
            console.log(`useEffect my users: `, data);
            setUsers(data.my_users);
            setExpanded(data.my_users[0].user_id);
        }
    }, [ data ]);

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <>
            <Grid
                item
                style={{
                    textAlign: `center`,
                }}>
                <img
                    src={Name}
                    className={classes.imgHeader} />
            </Grid>
            <Grid item>
                <Typography
                    variant="h4"
                    align="center">
                    Select an organization.
                </Typography>
            </Grid>
            <Grid item>
                <Typography
                    variant="subtitle2"
                    align="center"
                    className={classes.textSpacing}>
                    {`Your new learner will be part of an organization that you are already in. An admin or teacher will need to accept your new learner's application after these three easy steps.`}
                </Typography>
            </Grid>
            <div style={{
                height: theme.spacing(2),
            }}/>
            <Grid
                container
                item
                direction="row"
                justify="center"
                spacing={1}
            >
                <Grid
                    item
                    xs={12}
                    style={{
                        paddingLeft: 0,
                        paddingRight: 0,
                    }}>
                    { users.map((user) =>
                        <Accordion
                            key={user.user_id}
                            expanded={expanded === user.user_id}
                            onChange={handleChange(user.user_id)}
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
                                                backgroundColor: utils.stringToColor(user.given_name + ` ` + user.family_name),
                                                color: `white`,
                                            }}
                                        >
                                            <Typography variant="caption">
                                                { utils.nameToInitials(user.given_name + ` ` + user.family_name, 3) }
                                            </Typography>
                                        </Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Typography>
                                            { user.given_name + ` ` + user.family_name}
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
                        </Accordion>)}
                </Grid>
            </Grid>
        </>
    );
}
