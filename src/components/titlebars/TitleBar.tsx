import TitleBarButton from "~/components/titlebars/TitleBarButton";
import { appWindow } from "@tauri-apps/api/window";
import { FaSolidMinus, FaSolidXmark } from "solid-icons/fa";
import { TbRectangle } from "solid-icons/tb";
import "./TitleBar.css";

function Minimize() {
    return <TitleBarButton onClick={() => appWindow.minimize()}>
        <FaSolidMinus />
    </TitleBarButton>;
}

function ToggleMaximize() {
    return <TitleBarButton onClick={() => appWindow.toggleMaximize()}>
        <TbRectangle />
    </TitleBarButton>;
}

function Close() {
    return <TitleBarButton
        onClick={() => appWindow.close()}
        class={"hover:bg-red-500 dark:hover:bg-red-500"}
    >
        <FaSolidXmark />
    </TitleBarButton>;
}

export default function TitleBar() {
    return <div
        class={`titlebar`}
        data-tauri-drag-region
    >
        <Minimize />
        <ToggleMaximize />
        <Close />
    </div>;
}