import { ComponentProps, splitProps } from "solid-js";

export interface RowProps extends ComponentProps<"div"> {
    class?: string;
}

export default function Row(props: RowProps) {
    const [local, div] = splitProps(props, ["class"]);
    return <div class={`flex flex-row ${local.class || ""}`} {...div} />;
}
