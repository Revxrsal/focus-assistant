import { BsTrash } from "solid-icons/bs";
import { VsEdit } from "solid-icons/vs";
import { createSignal, For } from "solid-js";
import Button from "../button/Button";
import IconButton from "../button/IconButton";
import Spacer from "../decoration/Spacer";
import Column from "../layout/Column";
import Row from "../layout/Row";
import Header from "../typography/Header";
import { AllowListProps } from "./AllowList";
import { open } from "@tauri-apps/api/dialog";
import DeleteModal from "./DeleteModal";
import { getBaseFileName } from "~/util/util";

export default function AllowedApps(props: AllowListProps) {
    function deleteIndex(index: number) {
        props.setItems((v) =>
            v.filter((_item, itemIndex) => itemIndex !== index)
        );
    }

    return (
        <Column class="m-8 mt-0">
            <Header size={2} class="mb-8">
                Allowed apps
            </Header>
            <Row>
                <Button
                    onClick={async () => {
                        const file = await open({
                            multiple: true,
                            filters: [{
                                name: "Executable files",
                                extensions: ["exe"]
                            }]
                        });
                        if (typeof file == "string")
                            props.setItems((v) => [
                                ...v,
                                getBaseFileName(file)
                            ]);
                        else if (file && Array.isArray(file))
                            props.setItems((v) => [
                                ...v,
                                ...file.map(getBaseFileName)
                            ]);
                    }}
                    class="mb-4"
                >
                    Add
                </Button>
            </Row>
            <For each={props.items}>
                {(value, index) => (
                    <Item
                        value={value}
                        setValue={(v) => props.setItems(index(), v)}
                        placeholder={props.placeholder}
                        deleteValue={() => deleteIndex(index())}
                    />
                )}
            </For>
        </Column>
    );
}

function Item(props: {
    value: string;
    setValue: (value: string) => void;
    deleteValue: () => void;
    placeholder?: string;
}) {
    const [showDel, setShowDel] = createSignal(false);
    return (
        <>
            <DeleteModal
                show={showDel}
                setShow={setShowDel}
                delete={props.deleteValue}
            />
            <Row class="items-center content-center">
                <IconButton
                    class={`bg-stone-300 dark:bg-stone-950 
                    aspect-square w-12 h-12
                    items-center justify-center content-center text-center
                    hover:bg-stone-500 dark:hover:brightness-125`}
                    onClick={async () => {
                        const file = await open({
                            multiple: false,
                            filters: [{
                                name: "Executable files",
                                extensions: ["exe"]
                            }]
                        });
                        if (typeof file == "string")
                            props.setValue(getBaseFileName(file));
                    }}
                >
                    <VsEdit size={20} />
                </IconButton>

                <Spacer class="mx-2" />
                <IconButton
                    class={`bg-red-700 text-stone-200 aspect-square w-12 h-12
                    items-center justify-center content-center text-center
                    hover:brightness-125`}
                    onClick={(e) => {
                        if (e.shiftKey) props.deleteValue();
                        else setShowDel(true);
                    }}
                >
                    <BsTrash size={20} />
                </IconButton>
                <Spacer class="mx-2" />
                <span
                    class={`text-input text outline-none w-full my-3 p-3 rounded-md`}
                >
                    {props.value}
                </span>
            </Row>
        </>
    );
}
