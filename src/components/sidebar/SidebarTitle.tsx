import Spacer from "../decoration/Spacer";
import Flex from "../layout/Flex";
import Text from "../typography/Text";
import { TbFocus2 } from "solid-icons/tb";

export function SidebarTitle() {
    return (
        <Flex class="top-0 left-0 mt-3 mx-auto p-2.5 items-center">
            <div
                class={`px-2 py-2
                rounded-md aspect-square
                bg-sky-500 dark:bg-sky-600
                text-stone-800 dark:text-stone-100`}
            >
                <TbFocus2 size={28} />
            </div>
            <Spacer class="mx-2" />
            <Text class="text-lg font-bold">Focus Assistant</Text>
        </Flex>
    );
}
