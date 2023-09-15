import { IoClose } from "solid-icons/io";
import { Accessor, createEffect, JSX, onCleanup, Setter, Show } from "solid-js";
import "./Modal.css";

export interface ModalProps {
    show: Accessor<boolean>;
    setShow: Setter<boolean>;
    heading?: JSX.Element;
    children?: JSX.Element;
}

export default function Modal(props: ModalProps) {
    const focusableElements =
        "button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])";
    let modal: HTMLElement | undefined;

    function close() {
        props.setShow(false);
    }

    createEffect(() => {
        if (props.show()) {
            const originalFocus = document.activeElement as HTMLElement;
            const modalFocusableElements =
                modal?.querySelectorAll(focusableElements);
            const firstFocusableElement =
                modalFocusableElements?.[0] as HTMLElement;
            const lastFocusableElement = modalFocusableElements?.[
            modalFocusableElements.length - 1
                ] as HTMLElement;

            // eslint-disable-next-line no-inner-declarations
            function focusTrap(e: KeyboardEvent) {
                const { key, code, shiftKey } = e;
                const isTabPressed = (key || code) === "Tab";
                const isEscape = (key || code) === "Escape";
                if (!isTabPressed && !isEscape) return;
                if (isEscape) return props.setShow(true);
                if (shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement?.focus();
                    }
                } else if (document.activeElement === lastFocusableElement)
                    firstFocusableElement?.focus();
                e.preventDefault();
            }

            document.addEventListener("keydown", focusTrap);
            onCleanup(() => {
                document.removeEventListener("keydown", focusTrap);
                originalFocus?.focus();
            });
        }
    });

    return (
        <div
            classList={{
                "sr-only": !props.show()
            }}
        >
            <Show when={props.show()}>
                <div
                    role="presentation"
                    class="modalBackdrop"
                    onClick={() => close()}
                    onKeyPress={(e) => {
                        (e.key || e.code) === "Escape" && close();
                    }}
                />
                <section role="dialog" class="modal" ref={modal}>
                    <header>
                        {props.heading}
                        <button
                            aria-label="Close dialog"
                            class="hover:bg-sky-500 dark:hover:bg-sky-600 group transition h-12 w-12 fill-stone-200 text justify-center items-center flex rounded"
                            onClick={() => close()}
                        >
                            <IoClose size={24} />
                        </button>
                    </header>
                    <div class="modalBody">{props.children}</div>
                </section>
            </Show>
        </div>
    );
}
