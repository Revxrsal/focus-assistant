import { ComponentProps, splitProps } from "solid-js";

export interface FlexProps extends ComponentProps<"div"> {
    class?: string;
}

export default function Flex(props: FlexProps) {
    const [local, div] = splitProps(props, ["class"]);
    return <div class={`flex ${local.class || ""}`} {...div} />;
}
