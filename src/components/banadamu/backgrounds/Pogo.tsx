import Base from "./Base";
import PogoImage from "@/../assets/img/pogo.png";
import { makeStyles } from "@mui/styles";
import React from "react";

interface Props {
    children?: React.ReactNode;
}

const useStyles = makeStyles(({
    background: {
        "@media (max-height: 700px), (max-width: 650px)": {
            backgroundSize: `330px 330px;`,
        },
    },
}));

const Pogo = (props: Props) => {
    const { children } = props;
    const styles = useStyles();

    return (
        <Base
            className={styles.background}
            image={PogoImage}
        >
            {children}
        </Base>
    );
};

export default Pogo;
