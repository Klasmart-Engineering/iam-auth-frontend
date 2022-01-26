import config from "../config";
import { switchUser } from "@/api/authentication";
import {
    ProfileFragment,
    useProfiles,
} from "@/api/user-service/operations";
import Avatar from '@material-ui/core/Avatar';
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import EventRoundedIcon from '@material-ui/icons/EventRounded';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import Skeleton from '@material-ui/lab/Skeleton';
import { utils } from "kidsloop-px";
import QueryString from "query-string";
import React,
{
    useEffect,
    useState,
} from "react";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router";

const buildDisplayName = ({ givenName, familyName }: Pick<ProfileFragment, "givenName" | "familyName">) => {
    if (givenName) {
        return `${givenName}` + (familyName ? ` ${familyName}` : ``);
    } else {
        return `Name not set`;
    }
};

export function SelectUser () {
    const history = useHistory();
    const [ loadSingleUserError, setLoadSingleUserError ] = useState<boolean>(false);

    const {
        loading,
        data,
    } = useProfiles({
        fetchPolicy: `network-only`,
    });

    const users = data?.myUser?.profiles;

    // If we only have a single user, we want to keep showing the skeleton while we make the `switchUser`
    // API call and try to navigate to the Hub directly
    // If that API call fails, we can show the list of a single user anyway (so the client can try again)
    const shouldShowSkeleton = loading || (users?.length === 1 && !loadSingleUserError);

    useEffect(() => {
        setLoadSingleUserError(false);
        if (!users || users.length !== 1) return;

        const userId = users[0].id;

        async function loadOnlyUser () {
            const ok = await switchUser(userId);

            if (ok) {
                window.location.replace(config.endpoints.hub);
            } else {
                setLoadSingleUserError(true);
                console.error(`Could not switch to userId=${userId}`);
            }
        }
        loadOnlyUser();
    }, [ users ]);

    function handleEditName ({ id: userId }: Pick<ProfileFragment, "id">) {
        history.push({
            pathname: `/createprofile/name`,
            search: `?${QueryString.stringify({
                userId,
            })}`,
        });
    }

    function handleEditBirthday ({ id: userId }: Pick<ProfileFragment, "id">) {
        history.push({
            pathname: `/createprofile/birthday`,
            search: `?${QueryString.stringify({
                userId,
            })}`,
        });
    }

    async function handleSelectUser ({ id: userId }: Pick<ProfileFragment, "id">) {
        const ok = await switchUser(userId);
        if (ok) {
            history.push({
                pathname: `/continue`,
                search: `?${QueryString.stringify({
                    userId,
                })}`,
            });
        } else {
            console.error(`Could not switch to userId=${userId}`);
        }
    }

    function renderList () {
        if (shouldShowSkeleton) {
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
        } else if (users && users.length > 0) {
            return (
                users.map((user) =>
                    <ListItem
                        key={user.id}
                        button
                        onClick={() => handleSelectUser(user) }
                    >
                        <ListItemAvatar>
                            <Avatar
                                style={{
                                    backgroundColor: utils.stringToColor(user.givenName + ` ` + user.familyName),
                                    color: `white`,
                                }}
                            >
                                <Typography variant="caption">
                                    { utils.nameToInitials(buildDisplayName(user), 3) }
                                </Typography>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={buildDisplayName(user)}
                            secondary={user.dateOfBirth} />
                        <ListItemSecondaryAction>
                            { (user.givenName && !user.dateOfBirth) &&
                                    <Tooltip title={<FormattedMessage id="selectProfile_tooltipBirthday" />}>
                                        <IconButton
                                            aria-label="birthday"
                                            edge="end"
                                            style={{
                                                color: `#9e9e9e`,
                                            }}
                                            onClick={() => handleEditBirthday(user)}
                                        >
                                            <EventRoundedIcon />
                                        </IconButton>
                                    </Tooltip>
                            }
                            { !(user.givenName) &&
                                    <Tooltip title={<FormattedMessage id="selectProfile_tooltipName" />}>
                                        <IconButton
                                            aria-label="warning"
                                            edge="end"
                                            style={{
                                                color: `#F4970A`,
                                            }}
                                            onClick={() => handleEditName(user)}
                                        >
                                            <WarningRoundedIcon />
                                        </IconButton>
                                    </Tooltip>
                            }
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
                { !shouldShowSkeleton &&
                    <Typography
                        variant="h4"
                        align="center">
                        { (users && users.length > 0) ?
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
