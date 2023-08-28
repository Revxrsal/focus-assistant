import { ComponentProps, splitProps } from "solid-js";
import "./Button.css";

export type ButtonVariant = "primary" | "secondary";

export interface ButtonProps extends ComponentProps<"button"> {
    class?: string;
    variant?: ButtonVariant;
}

function getClass(variant?: ButtonVariant): string {
    if (variant === "secondary") return "secondary-button";
    else return "primary-button";
}

export default function Button(props: ButtonProps) {
    const [local, buttonProps] = splitProps(props, ["class", "variant"]);
    return (
        <button
            class={`${getClass(props.variant)} ${local.class || ""}`}
            {...buttonProps}
        />
    );
}
