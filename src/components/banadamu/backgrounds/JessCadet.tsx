import Base from "./Base";
import JessCadetImage from "@/../assets/img/jess_cadet.png";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

interface Props {
    children?: React.ReactNode;
}

const useStyles = makeStyles({
    background: {
        "@media (max-height: 800px)": {
            backgroundImage: `none`,
        },
    },
});

const JessCadet = (props: Props) => {
    const { children } = props;
    const styles = useStyles();

    return (
        <Base
            className={styles.background}
            image={JessCadetImage}>
            {children}
        </Base>
    );
};

export default JessCadet;
