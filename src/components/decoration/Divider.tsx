export default function Divider(props: { class?: string }) {
    return (
        <div class={`border border-stone-400 dark:border-stone-600 ${props.class || ""}`} />
    );
}
