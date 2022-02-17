import GenericError from "@/components/GenericError";
import GenericErrorProps from "@/components/interfaces/GenericErrorProps";
import * as React from "react";

export function Error (props: GenericErrorProps) {
    return <GenericError {...props} />;
}
