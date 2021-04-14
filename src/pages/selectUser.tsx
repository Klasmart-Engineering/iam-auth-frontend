import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { useHistory } from "react-router";
import useTheme from "@material-ui/core/styles/useTheme";
import { getMyUsers, myUserSampleResponse } from "../api/getMyUsers";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Skeleton from '@material-ui/lab/Skeleton';
import QueryString from "query-string";
import EditAttributesIcon from '@material-ui/icons/EditAttributes';

import { useEffect, useMemo, useState } from "react";
import { User } from "../api/queries/me";
import { utils } from "kidsloop-px";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";

import EventRoundedIcon from '@material-ui/icons/EventRounded';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import Tooltip from "@material-ui/core/Tooltip";
import { FormattedMessage } from "react-intl";
import { refreshToken, switchUser } from "../api/restapi";
import { useQuery } from "@apollo/client/react/hooks/useQuery";

const useStyles = makeStyles((theme) => createStyles({}));

export function SelectUser() {
    const history = useHistory();
    const [users, setUsers] = useState<User[]>([]);

    const { loading, data, refetch, error } = getMyUsers({
        fetchPolicy: `network-only`,
    })

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
            handleClick(data?.my_users[0])
        }
    }, [loading, data])

    const switchUsers = async (userId: string) => {
        try {
            const response = await switchUser(userId)
            return response;
        } catch (error) {
            console.log("Error switching user: ", error);
        }
    }

    const handleClick = (user: User, edit?: string) => {
        const userId = user.user_id;
        const queryString = QueryString.stringify({ userId })

        console.log(`handleClick`, user)

        if (!(user.given_name || user.username)) {
            history.push(`/createprofile/name?${queryString}`)
            return;
        }

        if (edit === "name") {
            history.push(`/createprofile/name?${queryString}`)
            return;
        } else if (edit === "birthday") {
            history.push(`/createprofile/birthday?${queryString}`)
            return;  
        } else {
            switchUsers(userId)
                .then((response) => {
                    history.push(`/continue?${queryString}`)
                })
                .catch((error) => {
                    console.log(`Error handling click: `, error);
                })
            return;
        }
    }

    function handleName(user: User) {
        if (user.given_name) {
<<<<<<< Updated upstream
            return `${user.given_name}` + user.family_name ? ` ${user.family_name}` : ``;
=======
            return `${user.given_name}` + (user.family_name ? ` ${user.family_name}` : ``);
>>>>>>> Stashed changes
        } else if (user.username) {
            return user.username;
        } else {
            return `Name not set`;
        }
    }

    return (
        <React.Fragment>
            <Grid item xs={12}>
                <Typography variant="h4" align="center">
                    <FormattedMessage id="selectProfile_title" />
                </Typography>
            </Grid>
            <Grid item xs={12} style={{ paddingLeft: 0, paddingRight: 0 }}>
                <List>
                    { loading ? 
                        <ListItem>
                            <ListItemAvatar>
                                <Skeleton animation="wave" variant="circle">
                                    <Avatar />
                                </Skeleton>
                            </ListItemAvatar>
                            <ListItemText 
                                primary={<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />} 
                                secondary={<Skeleton animation="wave" height={10} width="40%" />} 
                            />
                        </ListItem>
                        : users.map((user) => 
                            <ListItem 
                                button
                                key={user.user_id} 
                                onClick={() => handleClick(user) }
                            >
                                <ListItemAvatar>
                                    <Avatar 
                                        style={{ 
                                            backgroundColor: utils.stringToColor(user.given_name + " " + user.family_name),
                                            color: "white"
                                        }}
                                    >
                                        <Typography variant="caption">
                                            { utils.nameToInitials(handleName(user), 3) }
                                        </Typography>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={handleName(user)} secondary={user.date_of_birth} />
                                    <ListItemSecondaryAction>
                                        { (user.given_name || user.username) && !user.date_of_birth &&  
                                            <Tooltip title={<FormattedMessage id="selectProfile_tooltipBirthday" />}>
                                                <IconButton 
                                                    aria-label="birthday" 
                                                    edge="end"
                                                    onClick={() => handleClick(user, "birthday")}
                                                    style={{ color: "#9e9e9e" }}
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
                                                    onClick={() => handleClick(user, "name")}
                                                    style={{ color: "#F4970A" }}
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
                            </ListItem>
                        )
                    }
                </List>
            </Grid>
        </React.Fragment>
    );
}
