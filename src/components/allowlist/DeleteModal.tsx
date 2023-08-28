import { Accessor, Setter } from "solid-js";
import Modal from "../modal/Modal";
import Header from "../typography/Header";
import Text from "../typography/Text";
import Row from "../layout/Row";
import Button from "../button/Button";
import Spacer from "../decoration/Spacer";

export interface DeleteModalProps {
    show: Accessor<boolean>;
    setShow: Setter<boolean>;
    delete: () => void;
}

export default function DeleteModal(props: DeleteModalProps) {
    return (
        <Modal
            show={props.show}
            setShow={props.setShow}
            heading={<Header size={3}>Are you sure?</Header>}
        >
            <Text>
                Are you sure you want to delete this item?{" "}
                <span class="font-bold">This action cannot be undone!</span>
            </Text>
            <Row class="justify-end my-8">
                <Button
                    variant="secondary"
                    onClick={() => props.setShow(false)}
                >
                    Cancel
                </Button>
                <Spacer class="mx-2" />
                <button
                    class="button bg-red-500 dark:bg-red-600"
                    onClick={() => {
                        props.setShow(false);
                        props.delete();
                    }}
                >
                    Yes, delete
                </button>
            </Row>
            <Tip />
        </Modal>
    );
}

function Tip() {
    return (
        <Text class="text-xs">
            <span class="font-bold">Tip: </span>You can hold the shift key while
            deleting to ignore this confirmation.
        </Text>
    );
}
