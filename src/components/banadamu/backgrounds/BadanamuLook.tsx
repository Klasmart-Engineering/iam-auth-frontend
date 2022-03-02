import Base from "./Base";
import BadanamuLookImage from "@/../assets/img/badanamu_look.png";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

interface Props {
    children?: React.ReactNode;
}

const useStyles = makeStyles(({
    background: {
        "@media (max-height: 700px), (max-width: 650px)": {
            backgroundSize: `364px 307px;`,
        },
    },
}));

const BadanamuLook = (props: Props) => {
    const { children } = props;
    const styles = useStyles();

    return (
        <Base
            className={styles.background}
            image={BadanamuLookImage}>
            {children}
        </Base>
    );
};

export default BadanamuLook;
