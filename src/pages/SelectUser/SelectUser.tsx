
import React, { useEffect, useState } from "react";
import config from "@/config";
import { switchUser } from "@/api/authentication";
import {
    ProfileFragment,
    useProfiles,
} from "@/api/user-service/operations";
import { utils } from "@/lib/kidsloop-px";
import {
    Avatar,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Tooltip,
    Typography,
    Skeleton
} from "@mui/material";
import {
    EventRounded,
    WarningRounded,
} from "@mui/icons-material";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router";

const buildDisplayName = ({
    givenName,
    familyName,
}: Pick<ProfileFragment, "givenName" | "familyName">) => {
    if (givenName) {
        return `${givenName}` + (familyName ? ` ${familyName}` : ``);
    }
    
    return `Name not set`;
};

export default () => {
    const history = useHistory();
    const [ loadSingleUserError, setLoadSingleUserError ] = useState<boolean>(false);

    const {
        loading,
        data,
    } = useProfiles({
        fetchPolicy: `network-only`,
    });

    const users = data?.myUser?.profiles!;

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

    useEffect(() => {
        if (users?.length === 0) {
            history.push(`/no-profiles`);
        }
    }, [ users?.length, history ]);

    const handleEditName = ({ id: userId }: Pick<ProfileFragment, "id">) => {
        history.push({
            pathname: `/createprofile/name`,
            search: `?${new URLSearchParams([
                ['userId', userId]
            ]).toString()}`,
        });
    }

    const handleEditBirthday = ({ id: userId }: Pick<ProfileFragment, "id">) => {
        history.push({
            pathname: `/createprofile/birthday`,
            search: `?${new URLSearchParams([
                ['userId', userId]
            ]).toString()}`,
        });
    }

    const handleSelectUser = async ({ id: userId }: Pick<ProfileFragment, "id">) => {
        const ok = await switchUser(userId);

        if (ok) {
            history.push({
                pathname: `/continue`,
                search: `?${new URLSearchParams([
                    ['userId', userId]
                ]).toString()}`,
            });
        } else {
            console.error(`Could not switch to userId=${userId}`);
        }
    }

    // If we only have a single user, we want to keep showing the skeleton while we make the `switchUser`
    // API call and try to navigate to the Hub directly
    // If that API call fails, we can show the list of a single user anyway (so the client can try again)
    // useEffect will redirect to `NoProfiles` page`

    if ([loading || (users?.length === 1 && !loadSingleUserError), !users || users?.length === 0].some(Boolean)) {
        return (
            <List data-testid="select_user-skeleton-list" sx={{
                alignSelf: "stretch"
            }}>
                <ListItem>
                    <ListItemAvatar>
                        <Skeleton
                            animation="wave"
                            variant="circular">
                            <Avatar />
                        </Skeleton>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Skeleton
                                animation="wave"
                                height={10}
                                width="80%"
                                style={{
                                    marginBottom: 6,
                                }}
                            />
                        }
                        secondary={
                            <Skeleton
                                animation="wave"
                                height={10}
                                width="40%"
                            />
                        }
                    />
                </ListItem>
            </List>
        );
    }

    return (
        <>
            <Typography variant="h4">
                <FormattedMessage id="selectProfile_title" />
            </Typography>
            <List data-testid="select_user-users-list" sx={{
                alignSelf: "stretch" 
            }}>
                {users.map((user) => (
                    <ListItem
                        key={user.id}
                        button
                        onClick={() => handleSelectUser(user)}
                    >
                        <ListItemAvatar>
                            <Avatar
                                sx={{
                                    backgroundColor: utils.stringToColor(`${user.givenName} ${user.familyName}`),
                                    color: `white`,
                                }}
                            >
                                <Typography variant="caption">
                                    {utils.nameToInitials(buildDisplayName(user), 3)}
                                </Typography>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={buildDisplayName(user)}
                            secondary={user.dateOfBirth}
                        />
                        <ListItemSecondaryAction>
                            {user.givenName && !user.dateOfBirth && (
                                <Tooltip
                                    title={
                                        <FormattedMessage id="selectProfile_tooltipBirthday" />
                                    }
                                >
                                    <IconButton
                                        aria-label="birthday"
                                        edge="end"
                                        style={{
                                            color: `#9e9e9e`,
                                        }}
                                        onClick={() =>
                                            handleEditBirthday(user)
                                        }
                                    >
                                        <EventRounded />
                                    </IconButton>
                                </Tooltip>
                            )}
                            {!user.givenName && (
                                <Tooltip
                                    title={
                                        <FormattedMessage id="selectProfile_tooltipName" />
                                    }
                                >
                                    <IconButton
                                        aria-label="warning"
                                        edge="end"
                                        style={{
                                            color: `#F4970A`,
                                        }}
                                        onClick={() => handleEditName(user)}
                                    >
                                        <WarningRounded />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </>
    );
}
