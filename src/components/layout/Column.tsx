import { ComponentProps, splitProps } from "solid-js";

export interface ColumnProps extends ComponentProps<"div"> {
    class?: string;
}

export default function Column(props: ColumnProps) {
    const [local, div] = splitProps(props, ["class"]);
    return <div class={`flex flex-col ${local.class || ""}`} {...div} />;
}
