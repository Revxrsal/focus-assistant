import { BsGear, BsPersonWorkspace } from "solid-icons/bs";
import { VsLock } from "solid-icons/vs";
import { useNavigate } from "solid-start";
import { canOpenSettings } from "~/util/options";
import Divider from "../decoration/Divider";
import Column from "../layout/Column";
import { SidebarItem } from "./SidebarItem";
import { SidebarTitle } from "./SidebarTitle";
import "./sidebar.css";

export default function Sidebar() {
    const navigate = useNavigate();
    return (
        <>
            <Column class="sidebar">
                <SidebarTitle />
                <Divider class="mx-4 my-2" />
                <SidebarItem
                    label="Focus"
                    icon={<BsPersonWorkspace size={28} />}
                    onClick={() => navigate("/")}
                />
                <SidebarItem
                    disabled={!canOpenSettings()}
                    label="Blocks"
                    icon={<VsLock size={28} />}
                    onClick={() => {
                        if (canOpenSettings()) navigate("/blocks");
                    }}
                />
                <SidebarItem
                    disabled={!canOpenSettings()}
                    label="Settings"
                    icon={<BsGear size={28} />}
                    onClick={() => {
                        if (canOpenSettings()) navigate("/settings");
                    }}
                />
            </Column>
        </>
    );
}
