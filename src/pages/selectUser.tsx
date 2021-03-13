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

import { AddCircleOutline as AddCircleIcon } from "@styled-icons/material/AddCircleOutline";
import { useEffect, useMemo, useState } from "react";
import { User } from "../api/queries/me";
import { utils } from "kidsloop-px";
import { setSwitchUser } from "../api/setSwitchUser";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";

import EventRoundedIcon from '@material-ui/icons/EventRounded';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import Tooltip from "@material-ui/core/Tooltip";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles((theme) => createStyles({}));

export function SelectUser() {
    const history = useHistory();
    const [users, setUsers] = useState<User[]>([]);

    const { loading, data, refetch } = getMyUsers();

    useEffect(() => {
        if (url.hostname === "0.0.0.0" || url.hostname === "localhost") {
            setUsers(myUserSampleResponse.my_users);
        } else if (data) {
            setUsers(data.my_users);
        }
        if (data?.my_users.length === 1) {
            handleClick(data?.my_users[0].user_id)
        }
    }, [data])

    const switchUsers = async (userId: string) => {
        try {
            const response = await switchUser({
                variables: {
                    user_id: userId,
                }
            })
            return response;
        } catch (error) {
            console.log("Error switching user: ", error);
        }
    }

    const handleClick = (userId: string, edit?: string) => {
        const queryString = QueryString.stringify({ userId })

        if (edit === "name") {
            history.push(`/createprofile/name?${queryString}`)
        } else if (edit === "birthday") {
            history.push(`/createprofile/birthday?${queryString}`)  
        } else {
            switchUsers(userId)
                .then((response) => {
                    history.push(`/continue?${queryString}`)
                })
                .catch((error) => {
                    console.log(`Error handling click: `, error);
                })
        }
    }

    function handleName(user: User) {
        const name = user.given_name === null ? user.username : (user.given_name + " " + user.family_name);
        return name ?? `Name undefined`;
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
                                onClick={() => handleClick(user.user_id) }
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
                                                    onClick={() => handleClick(user.user_id, "birthday")}
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
                                                    onClick={() => handleClick(user.user_id, "name")}
                                                    style={{ color: "#F4970A" }}
                                                >
                                                    <WarningRoundedIcon />
                                                </IconButton>
                                            </Tooltip>
                                        }
                                    </ListItemSecondaryAction>
                            </ListItem>
                        )
                    }
                </List>
            </Grid>
        </React.Fragment>
    );
}
