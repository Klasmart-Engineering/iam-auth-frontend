import config from "../config";
import { switchUser } from "@/api/authentication";
import {
    ProfileFragment,
    useProfiles,
} from "@/api/user-service/operations";
import { utils } from "@/lib/kidsloop-px";
import {
    EventRounded as EventRoundedIcon,
    WarningRounded as WarningRoundedIcon,
} from "@mui/icons-material";
import {
    Avatar,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Skeleton,
    Tooltip,
    Typography,
} from "@mui/material";
import QueryString from "query-string";
import React,
{
    useEffect,
    useState,
} from "react";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router";

const buildDisplayName = ({
    givenName,
    familyName,
}: Pick<ProfileFragment, "givenName" | "familyName">) => {
    if (givenName) {
        return `${givenName}` + (familyName ? ` ${familyName}` : ``);
    } else {
        return `Name not set`;
    }
};

const Header = ({ children }: { children?: React.ReactNode }): JSX.Element => {
    return <Grid
        item
        xs={12}>{children}</Grid>;
};

const ListContainer = ({ "data-testid": testId, children }: { children?: React.ReactNode; ["data-testid"]?: string }): JSX.Element => {
    return <Grid
        item
        xs={12}
        data-testid={testId}
        style={{
            paddingLeft: 0,
            paddingRight: 0,
        }}
    >
        <List>{children }</List>
    </Grid>;
};

const LoadingSkeleton = (): JSX.Element => {
    return (
        <>
            <Header/>
            <ListContainer data-testid="select_user-skeleton-list">
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
            </ListContainer>
        </>
    );
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

    // If we only have a single user, we want to keep showing the skeleton while we make the `switchUser`
    // API call and try to navigate to the Hub directly
    // If that API call fails, we can show the list of a single user anyway (so the client can try again)
    if (loading || (users?.length === 1 && !loadSingleUserError)) {
        return <LoadingSkeleton />;
    }

    if (!users || users?.length === 0) {
        // useEffect will redirect to `NoProfiles` page`
        return <LoadingSkeleton/>;
    }

    return (
        <>
            <Header>
                <Typography
                    variant="h4"
                    align="center"
                    data-testid="select_profile-title"
                >
                    <FormattedMessage id="selectProfile_title" />
                </Typography>
            </Header>
            <ListContainer data-testid="select_user-users-list">
                {users.map((user) => (
                    <ListItem
                        key={user.id}
                        button
                        data-testid="profile"
                        onClick={() => handleSelectUser(user)}
                    >
                        <ListItemAvatar>
                            <Avatar
                                style={{
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
                                        <EventRoundedIcon />
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
                                        <WarningRoundedIcon />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </ListContainer>
        </>
    );
}
