import { ComponentProps, splitProps } from "solid-js";

/**
 * Represents a text component. We specify our own 'class'
 * property to be able to add our own classes then allow
 * the user to add additional classes as needed.
 */
export interface TextProps extends ComponentProps<"p"> {
    class?: string;
}

export default function Text(props: TextProps) {
    const [local, pProps] = splitProps(props, ["class"]);
    return <p class={`text ${local.class || ""}`} {...pProps} />;
}