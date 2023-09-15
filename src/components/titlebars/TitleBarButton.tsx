import { ComponentProps, splitProps } from "solid-js";
import "./TitleBar.css";

export default function TitleBarButton(props: ComponentProps<"div">) {
    let [c, others] = splitProps(props, ["class"]);
    return <div class={`titlebar-button ${c.class || ""}`} {...others} />;
}