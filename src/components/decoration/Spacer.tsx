export default function Spacer(props: { class: string }) {
    return (
        <div class={`${props.class || ""}`} aria-roledescription="spacing" />
    );
}
