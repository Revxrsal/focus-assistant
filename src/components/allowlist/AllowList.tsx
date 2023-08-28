import { ComponentProps } from "solid-js";
import { SetStoreFunction, Store } from "solid-js/store";

export interface AllowListProps extends ComponentProps<"div"> {
    items: Store<string[]>;
    setItems: SetStoreFunction<string[]>;
    placeholder: string;
}
