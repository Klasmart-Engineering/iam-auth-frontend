import { getMyUsers } from "../api/getMyUsers";
import { User } from "../api/queries/me";
import {
    refreshToken,
    switchUser,
} from "../api/restapi";
import config from "../config";
import {
    Avatar,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Tooltip,
    Typography,
} from "@material-ui/core";
import EventRoundedIcon from '@material-ui/icons/EventRounded';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import Skeleton from '@material-ui/lab/Skeleton';
import { utils } from "kidsloop-px";
import QueryString from "query-string";
import * as React from "react";
import {
    useEffect,
    useState,
} from "react";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router";

export function SelectUser () {
    const history = useHistory();
    const [ users, setUsers ] = useState<User[]>([]);

    const {
        loading,
        data,
        refetch,
        error,
    } = getMyUsers({
        fetchPolicy: `network-only`,
    });

    useEffect(() => {
        if (error) {
            refreshToken().then(() => {
                refetch();
            });
        }
        if (data) {
            setUsers(data.my_users);
        }
        if (data?.my_users.length === 1) {
            handleClick(data?.my_users[0]);
        }
    }, [ loading, data ]);

    const switchUsers = async (userId: string) => {
        try {
            const response = await switchUser(userId);
            return response;
        } catch (error) {
            console.log(`Error switching user: `, error);
        }
    };

    const handleClick = (user: User, edit?: string) => {
        const userId = user.user_id;
        const queryString = QueryString.stringify({
            userId,
        });

        console.log(`handleClick`, user);

        if (!(user.given_name || user.username)) {
            history.push(`/createprofile/name?${queryString}`);
            return;
        }

        if (edit === `name`) {
            history.push(`/createprofile/name?${queryString}`);
            return;
        } else if (edit === `birthday`) {
            history.push(`/createprofile/birthday?${queryString}`);
            return;
        } else {
            switchUsers(userId)
                .then(() => {
                    history.push(`/continue?${queryString}`);
                })
                .catch((error) => {
                    console.log(`Error handling click: `, error);
                });
            return;
        }
    };

    const handleName = (user: User) => {
        if (user.given_name) {
            return `${user.given_name}` + (user.family_name ? ` ${user.family_name}` : ``);
        } else if (user.username) {
            return user.username;
        } else {
            return `Name not set`;
        }
    };

    function renderList () {
        if (loading) {
            return (
                <ListItem>
                    <ListItemAvatar>
                        <Skeleton
                            animation="wave"
                            variant="circle">
                            <Avatar />
                        </Skeleton>
                    </ListItemAvatar>
                    <ListItemText
                        primary={<Skeleton
                            animation="wave"
                            height={10}
                            width="80%"
                            style={{
                                marginBottom: 6,
                            }} />}
                        secondary={<Skeleton
                            animation="wave"
                            height={10}
                            width="40%" />}
                    />
                </ListItem>
            );
        } else if (users.length > 0) {
            return (
                users.map((user) =>
                    <ListItem
                        key={user.user_id}
                        button
                        onClick={() => handleClick(user) }
                    >
                        <ListItemAvatar>
                            <Avatar
                                style={{
                                    backgroundColor: utils.stringToColor(user.given_name + ` ` + user.family_name),
                                    color: `white`,
                                }}
                            >
                                <Typography variant="caption">
                                    { utils.nameToInitials(handleName(user), 3) }
                                </Typography>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={handleName(user)}
                            secondary={user.date_of_birth} />
                        <ListItemSecondaryAction>
                            { (user.given_name || user.username) && !user.date_of_birth &&
                                    <Tooltip title={<FormattedMessage id="selectProfile_tooltipBirthday" />}>
                                        <IconButton
                                            aria-label="birthday"
                                            edge="end"
                                            style={{
                                                color: `#9e9e9e`,
                                            }}
                                            onClick={() => handleClick(user, `birthday`)}
                                        >
                                            <EventRoundedIcon />
                                        </IconButton>
                                    </Tooltip>
                            }
                            { !(user.given_name || user.username) &&
                                    <Tooltip title={<FormattedMessage id="selectProfile_tooltipName" />}>
                                        <IconButton
                                            aria-label="warning"
                                            edge="end"
                                            style={{
                                                color: `#F4970A`,
                                            }}
                                            onClick={() => handleClick(user, `name`)}
                                        >
                                            <WarningRoundedIcon />
                                        </IconButton>
                                    </Tooltip>
                            }
                            {/* { (user.given_name || user.username) && user.date_of_birth &&
                                    <Tooltip title={<FormattedMessage id="Edit Profile" />}>
                                        <IconButton
                                            aria-label="change info"
                                            edge="end"
                                            onClick={() => handleClick(user, "name")}
                                            style={{ color: "#9e9e9e" }}
                                        >
                                            <EditAttributesIcon />
                                        </IconButton>
                                    </Tooltip>
                                } */}
                        </ListItemSecondaryAction>
                    </ListItem>)
            );
        } else {
            return (
                <Typography
                    variant="body2"
                    align="center">
                    <FormattedMessage
                        id="selectProfile_noOrgSubtitle"
                        values={{
                            platformName: config.branding.company.name,
                        }}
                    />
                </Typography>
            );
        }
    }

    return (
        <React.Fragment>
            <Grid
                item
                xs={12}>
                { !loading &&
                    <Typography
                        variant="h4"
                        align="center">
                        { (users.length > 0) ?
                            <FormattedMessage id="selectProfile_title" /> :
                            <FormattedMessage id="selectProfile_noOrgTitle"/>
                        }
                    </Typography>
                }
            </Grid>
            <Grid
                item
                xs={12}
                style={{
                    paddingLeft: 0,
                    paddingRight: 0,
                }}>
                <List>
                    { renderList() }
                </List>
            </Grid>
        </React.Fragment>
    );
}
