import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import React from "react";

interface Props {
    children: React.ReactNode;
    image: string;
    className?: string;
}

type StyleProps = Pick<Props, "image">

const useStyles = makeStyles({
    background: {
        backgroundColor: `rgba(231, 235, 242, 0.3)`,
        backgroundImage: (props: StyleProps) => `url(${props.image})`,
        backgroundPosition: `center bottom`,
        backgroundRepeat: `no-repeat`,
        height: `100%`,
        width: `100%`,
    },
    container: {
        padding: `0 2rem`,
        display: `flex`,
        flexDirection: `column`,
    },
});

const Base = (props: Props): JSX.Element => {
    const {
        children,
        image,
        className,
    } = props;
    const styles = useStyles({
        image,
    });

    return <div className={clsx(styles.background, className)}><div className={styles.container}>{children}</div></div>;
};

export default Base;
