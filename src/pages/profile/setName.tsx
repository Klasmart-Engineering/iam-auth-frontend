import Name from "../../../assets/img/create_profile/name.svg";
import { User } from '../../api/queries/user';
import { useGetUserInformation } from '../../api/useGetUser';
import { useUpdateUser } from '../../api/useUpdateUser';
import { Button } from "@/lib/kidsloop-px";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import {
    makeStyles,
    Theme,
    useTheme,
} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import QueryString from "query-string";
import React,
{
    useEffect,
    useMemo,
    useState,
} from 'react';
import { FormattedMessage } from 'react-intl';
import {
    useHistory,
    useLocation,
} from 'react-router';

const useStyles = makeStyles((theme: Theme) => ({
    backButton: {
        paddingTop: theme.spacing(1),
        fontSize: 12,
    },
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
}));

export default function SetName () {
    const classes = useStyles();
    const history = useHistory();
    const theme = useTheme();
    const location = useLocation();

    const [ name, setName ] = useState<string | null>(null);
    const [ familyName, setFamilyName ] = useState<string | null>(null);
    const [ isUsername, setIsUsername ] = useState(false);
    const [ canSkip, setSkip ] = useState(false);

    const [ userInfo, setUserInfo ] = useState<User>();

    const userId = useMemo(() => {
        const parsed = QueryString.parse(location.search);
        const userId = Array.isArray(parsed.userId) ? parsed.userId[0] : parsed.userId;

        return userId;
    }, []);

    const { loading: loadingUserInfo, data: userInformation } = useGetUserInformation({
        variables: {
            user_id: userId ? userId : ``,
        },
        skip: userId === null || canSkip,
    });

    useEffect(() => {
        if (!loadingUserInfo && userInformation) {
            setUserInfo(userInformation.user);
            setSkip(true);
        }
    }, [ userInformation ]);

    const [ setUpdateUser ] = useUpdateUser();

    const handleUpdate = async () => {
        try {
            if (userId === null) throw new Error(`userId is null`);
            const response = await setUpdateUser({
                variables: {
                    user_id: userId,
                    given_name: isUsername ? userInfo?.given_name ?? null : name,
                    family_name: familyName,
                    email: userInfo?.email ?? null,
                    phone: userInfo?.phone ?? null,
                    avatar: userInfo?.avatar ?? null,
                    date_of_birth: userInfo?.date_of_birth ?? null,
                    username: isUsername ? name : userInfo?.username ?? ``,
                },
            });

            return response;
        } catch (error) {
            console.error(`Error updating user: `, error);
        }
    };

    const handlePrimaryAction = async () => {
        if (userId) {
            const response = await handleUpdate();

            if (response) {
                history.push(userInfo?.date_of_birth ?
                    `/signinselect` :
                    `/createprofile/birthday${location.search}`);
            }
        }
    };

    function usernameSwitcher () {
        return (
            <Grid item>
                <FormControlLabel
                    control={
                        <Switch
                            color="primary"
                            checked={isUsername}
                            size="small"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsUsername(e.target.checked)}
                        />
                    }
                    label={
                        <Typography variant="caption">
                            { isUsername ? `Switch to Name` : `Switch to Username` }
                        </Typography>
                    }
                    labelPlacement="start"
                />
            </Grid>
        );
    }

    return (
        <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="center"
            style={{
                overflowX: `hidden`,
            }}
        >
            <Grid
                container
                item
                direction="column"
                justify="center"
                alignItems="center"
                spacing={2}
            >
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
                        { userId ? <FormattedMessage id="name_titleUpdate" /> : <FormattedMessage id="name_titleCreate" />}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography
                        variant="subtitle2"
                        align="center"
                        className={classes.textSpacing}>
                        { userId &&
                            loadingUserInfo ?
                            <FormattedMessage
                                id="name_prompt"
                                values={{
                                    name: isUsername ?
                                        <FormattedMessage id="username" /> :
                                        <FormattedMessage id="name" />,
                                }}
                            /> :
                            <FormattedMessage
                                id="name_promptUpdate"
                                values={{
                                    name: isUsername ?
                                        <FormattedMessage id="username" /> :
                                        <FormattedMessage id="name" />,
                                    account: userInfo?.email ?? userInfo?.phone,
                                }}
                            />
                        }
                        {` `}<FormattedMessage id="name_promptEnd" />
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
                        sm={6}>
                        <TextField
                            fullWidth
                            required
                            helperText={isUsername ?
                                <Grid
                                    container
                                    direction="row"
                                    justify="space-between"
                                    alignItems="center"
                                >
                                    <Grid item>
                                        <FormattedMessage id="name_fieldUsername" />
                                    </Grid>
                                    { usernameSwitcher() }
                                </Grid> :
                                <FormattedMessage id="name_fieldGivenName" />
                            }
                            value={name}
                            variant="outlined"
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            { setName(event?.target.value); }
                            }
                        />
                    </Grid>
                    { !isUsername &&
                        <>
                            <Grid
                                item
                                xs={12}
                                sm={6}>
                                <TextField
                                    fullWidth
                                    helperText={
                                        <FormattedMessage id="name_fieldFamilyName" />
                                    }
                                    value={familyName}
                                    variant="outlined"
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                    { setFamilyName(event?.target.value); }
                                    }
                                />
                            </Grid>
                            <Grid
                                container
                                item
                                justify="flex-end"
                                alignItems="center"
                                style={{
                                    marginRight: theme.spacing(1),
                                }}
                            >
                                { usernameSwitcher() }
                            </Grid>
                        </>
                    }
                </Grid>
            </Grid>
            <Grid
                container
                item
                justify="center"
                alignContent="center"
                style={{
                    paddingTop: theme.spacing(4),
                    paddingBottom: theme.spacing(2),
                }}
            >
                <Grid item>
                    <Button
                        fullWidth
                        rounded
                        color="primary"
                        disabled={name === ``}
                        label={ userId ? <FormattedMessage id="name_buttonSave" /> : <FormattedMessage id="name_buttonNext" /> }
                        variant="contained"
                        size="medium"
                        onClick={() => handlePrimaryAction()}
                    />
                    { !userId &&
                        <Button
                            fullWidth
                            label={<FormattedMessage id="name_buttonBack" />}
                            variant="text"
                            disabled={userId !== null}
                            className={classes.backButton}
                            size="small"
                            onClick={() => history.goBack()}
                        />
                    }
                </Grid>
            </Grid>
        </Grid>
    );
}
