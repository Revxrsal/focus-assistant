import { BsTrash } from "solid-icons/bs";
import { createSignal, For } from "solid-js";
import Button from "../button/Button";
import IconButton from "../button/IconButton";
import Spacer from "../decoration/Spacer";
import Column from "../layout/Column";
import Row from "../layout/Row";
import Header from "../typography/Header";
import { AllowListProps } from "./AllowList";
import DeleteModal from "./DeleteModal";

export default function AllowedWebsites(props: AllowListProps) {
    function deleteIndex(index: number) {
        props.setItems((v) =>
            v.filter((_item, itemIndex) => itemIndex !== index)
        );
    }

    return (
        <>
            <Column class="m-8 mt-0">
                <Header size={2} class="mb-8">
                    Allowed websites
                </Header>
                <Row>
                    <Button
                        onClick={() => props.setItems((v) => [...v, ""])}
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
        </>
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
                <input
                    type="text"
                    class={`text-input text outline-none w-full my-3 p-3 rounded-md`}
                    value={props.value}
                    placeholder={props.placeholder}
                    onChange={(v) => props.setValue(v.target.value)}
                >
                    {props.value}
                </input>
            </Row>
        </>
    );
}
