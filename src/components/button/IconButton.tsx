import { ComponentProps, splitProps } from "solid-js";

export interface IconButtonProps extends ComponentProps<"button"> {
    class?: string;
}

export default function IconButton(props: IconButtonProps) {
    const [iProps, bProps] = splitProps(props, ["class"]);
    return <button
        class={`fill text p-2 flex
                hover:text-stone-100 dark:hover-stone-400 transition-all 
                focus:ring-2 focus:ring-sky-700 
                rounded-md ${iProps.class || ""}`
        }
        {...bProps}
    />;
}