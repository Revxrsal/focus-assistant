import { ComponentProps, JSX, splitProps } from "solid-js";
import Spacer from "../decoration/Spacer";
import Row from "../layout/Row";
import Text from "../typography/Text";

export interface SidebarItemProps extends ComponentProps<"div"> {
    class?: string;
    label: string;
    disabled?: boolean;
    icon: JSX.Element;
}

export function SidebarItem(props: SidebarItemProps) {
    const [local, divProps] = splitProps(props, ["class"]);
    return (
        <Row class={(props.disabled ? `disabled-sidebar-item` : `sidebar-item`) + (local.class || "")} {...divProps}>
            <div class="text-stone-800 fill-stone-800 dark:text-gray-100 dark:fill-gray-100">
                {props.icon}
            </div>
            <Spacer class="mx-4" />
            <Text class="text-sm font-semibold">{props.label}</Text>
        </Row>
    );
}

export function SidebarSubitem(props: SidebarItemProps) {
    return <SidebarItem class="mx-8 py-2 sidebar-subitem" {...props} />;
}
