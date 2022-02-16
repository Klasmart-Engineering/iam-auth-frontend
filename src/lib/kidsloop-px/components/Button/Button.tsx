import Loading,
{ useLoadingStyles } from "./Loading";
import {
    Box,
    Button as Btn,
    createStyles,
    makeStyles,
    Theme,
    Tooltip,
    Typography,
    useTheme,
} from "@material-ui/core";
import { SvgIconComponent } from "@material-ui/icons";
import clsx from "clsx";
import React,
{ useState } from "react";

const useStyles = makeStyles((theme) => createStyles({
    extendedText: {
        marginLeft: theme.spacing(1),
    },
    rounded: {
        borderRadius: 24,
    },
}));

const getTextColor = (color: string | undefined, variant: Variant | undefined, theme: Theme) => {
    if (variant === `contained`) {
        if (!color) return `white`;
        if (COLORS.includes(color as Color)) return theme.palette[color as Color].contrastText;
        return theme.palette.getContrastText(color);
    }
    if (!color) return `black`;
    if (COLORS.includes(color as Color)) return theme.palette[color as Color].main;
    return color;
};

const getBackgroundColor = (color: string | undefined, variant: Variant | undefined, theme: Theme) => {
    if (!color || variant !== `contained`) return;
    if (COLORS.includes(color as Color)) return theme.palette[color as Color].main;
    return color;
};

const getBorderColor = (color: string | undefined, variant: Variant | undefined, theme: Theme) => {
    if (!color || variant !== `outlined`) return;
    if (COLORS.includes(color as Color)) return theme.palette[color as Color].main;
    return color;
};

const COLORS = [
    `primary`,
    `secondary`,
    `error`,
    `warning`,
    `info`,
    `success`,
] as const;

// export type Color = { [P in keyof Palette]: Palette[P] extends PaletteColor? P : never }[keyof Palette]
export type Color = typeof COLORS[number]
export type Variant = "text" | "outlined" | "contained"

export interface Props {
    className?: string;
    label: React.ReactNode;
    icon?: SvgIconComponent;
    type?: "submit" | "reset" | "button";
    variant?: Variant;
    size?: "small" | "medium" | "large";
    rounded?: boolean;
    fullWidth?: boolean;
    color?: string;
    disabled?: boolean;
    tooltip?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => Promise<void> | void;
}

export default function Button (props: Props) {
    const {
        className,
        label,
        type,
        variant,
        color,
        disabled,
        tooltip,
        onClick,
        rounded,
        icon: Icon,
        ...rest
    } = props;
    const classes = useStyles();
    const loadingClasses = useLoadingStyles();
    const theme = useTheme();
    const [ loading, setLoading ] = useState(false);

    const textColor_ = getTextColor(color, variant, theme);
    const backgroundColor_ = getBackgroundColor(color, variant, theme);
    const borderColor_ = getBorderColor(color, variant, theme);

    color && COLORS.includes(color as Color) ? theme.palette[color as Color].main : color;

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setLoading(true);
        let error;
        try {
            await onClick?.(event);
        } catch (err) {
            error = err;
        }
        setLoading(false);
        if (error) throw error;
    };

    return <Tooltip title={tooltip ?? ``}>
        <span>
            <Btn
                variant={variant}
                type={type}
                style={{
                    color: !disabled ? textColor_ : undefined,
                    backgroundColor: !disabled ? backgroundColor_ : undefined,
                    borderColor: !disabled ? borderColor_ : undefined,
                }}
                disabled={disabled}
                className={clsx(className, {
                    [loadingClasses.buttonLoading]: loading,
                    [classes.rounded]: rounded,
                })}
                onClick={handleClick}
                {...rest}
            >
                <Box
                    display="flex"
                    flexDirection="row"
                    className={clsx({
                        [loadingClasses.buttonLoadingContent]: loading,
                    })}
                >

                    {Icon && <Icon />}
                    <Typography
                        noWrap
                        variant="inherit"
                        className={clsx({
                            [classes.extendedText]: Icon && label,
                        })}
                    >
                        {label}
                    </Typography>
                </Box>
                {loading && <Loading />}
            </Btn>
        </span>
    </Tooltip>;
}
