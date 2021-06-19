import React, { useEffect, useMemo } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Button } from "kidsloop-px";
import { DatePicker } from "@material-ui/pickers";
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import QueryString from "query-string";

import { getMyInformation } from '../../api/getMyInformation';
import { getUserInformation } from '../../api/getUser';
import { User as MyUser } from '../../api/queries/me';
import { User } from '../../api/queries/user';
import { updateUser } from '../../api/updateUser';

import Birthday from "../../../assets/img/create_profile/birthday.svg";
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import config from '../../config';

const useStyles = makeStyles((theme: Theme) => ({
    backButton: {
        paddingTop: theme.spacing(1), 
        fontSize: 12,
    },
    card: {
        alignItems: "center",
        padding: "48px 40px !important",
        [theme.breakpoints.down("xs")]: {
            padding: "0 !important",
        },
    },
    imgHeader: {
        width: "60%",
        padding: theme.spacing(4, 0),
        [theme.breakpoints.down("xs")]: {
            width: "40%",
        },
    },
    pageWrapper: {
        display: "flex",
        flexGrow: 1,
        height: "100vh",
        [theme.breakpoints.down("xs")]: {
            padding: "0 !important",
        },
    },
    root: {
        flexGrow: 0,
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    safeArea: {
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)",
        backgroundColor: theme.palette.background.paper
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
}));

export default function SetBirthday() {
    const classes = useStyles();
    const history = useHistory();
    const theme = useTheme();
    const location = useLocation();

    const today = new Date();
    const [date, setDate] = useState<Date | null | undefined>(null);

    const [userInfo, setUserInfo] = useState<User>();
    const [canSkip, setSkip] = useState(false);

    const userId = useMemo(() => {
        const parsed = QueryString.parse(location.search);
        const userId = Array.isArray(parsed.userId) ? parsed.userId[0] : parsed.userId;

        return userId;
    }, []);

    const { loading: loadingUserInfo, data: userInformation, refetch } = getUserInformation({ 
        variables: { user_id: userId ? userId : `` },
        skip: userId === null
    });

    useEffect(() => {
        if (!canSkip) {
            refetch();
        }
        if (userInformation) {
            setUserInfo(userInformation.user);
            setSkip(true);
        }
    },[userInformation]);

    const [ setUpdateUser ] = updateUser();

    const handleUpdate = async () => {
        try {
            if (userId === null) throw new Error(`userId is null`);
            if (!date) {
                history.push(`/signinselect`);
            }
            const formattedDate = moment(date).format("MM-YYYY");

            const response = await setUpdateUser({
                variables: {
                    user_id: userId,
                    given_name: userInfo?.given_name ?? ``,
                    family_name: userInfo?.family_name ?? ``,
                    email: userInfo?.email ?? null,
                    phone: userInfo?.phone ?? null,
                    avatar: userInfo?.avatar ?? null,
                    date_of_birth: formattedDate,
                    username: userInfo?.username ?? ``,
                }
            })

            return response;
        } catch (error) {
            console.error("Error updating user: ", error);
        }
    };

    const handlePrimaryAction = async () => {
        if (userId) {
            const response = await handleUpdate();
            if (response) {
                history.push(`/signinselect`);
            }
        } 
    }

    return (
        <Grid 
            container 
            direction="column" 
            justify="space-between" 
            alignItems="center"
            style={{ overflowX: "hidden" }}
        >
            <Grid 
                container
                item
                direction="column"
                justify="center"
                alignItems="center"
                spacing={2}
            >
                <Grid item style={{ textAlign: "center" }}>
                    <img src={Birthday} className={classes.imgHeader} />
                </Grid>
                <Grid item>
                    <Typography variant="h4" align="center">
                        { userId ? <FormattedMessage id="birthday_titleUpdate" /> : <FormattedMessage id="birthday_titleCreate" />}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle2" align="center" className={classes.textSpacing}>
                        { userId && 
                            loadingUserInfo ? 
                                <FormattedMessage id="birthday_prompt" /> :
                                <FormattedMessage id="birthday_promptUpdate" values={{ account: userInfo?.email ?? userInfo?.phone }}/>
                        }
                        {" "}<FormattedMessage id="birthday_promptCreate" values={{platformName: config.branding.company.name }}/>
                    </Typography>
                </Grid>
                <div style={{ height: theme.spacing(2) }}/>
                <Grid item>
                    <DatePicker
                        defaultValue={null}
                        value={date}
                        maxDate={today}
                        inputVariant="outlined"
                        views={["year", "month"]}
                        helperText={<FormattedMessage id="birthday_datePickerHelper" />}
                        onChange={newDate => setDate(newDate?.toDate())}
                    />
                </Grid>
            </Grid>
            <Grid 
                container 
                item
                justify="center"
                alignContent="center"
                style={{ paddingTop: theme.spacing(4), paddingBottom: theme.spacing(2) }}
            >
                <Grid item>
                    <Button
                        color="primary"
                        label={ !date ? 
                            <FormattedMessage id="birthday_buttonSkip" /> : 
                            userId ? 
                                <FormattedMessage id="birthday_buttonSave" /> : 
                                <FormattedMessage id="birthday_buttonNext" />
                        }
                        variant="contained"
                        onClick={() => handlePrimaryAction()}
                        size="medium"
                        fullWidth
                        rounded
                    />
                    { !userId &&
                        <Button
                            label={<FormattedMessage id="birthday_buttonBack" />}
                            variant="text"
                            disabled={userId !== null}
                            className={classes.backButton}
                            onClick={() => history.goBack()}
                            size="small"
                            fullWidth
                        />
                    }
                </Grid>
            </Grid>
        </Grid>
    );
}
