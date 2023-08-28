import { setTimer, timer } from "~/util/timer";

export default function TimerSlider() {
    return (
        <input
            type="range"
            class={"w-1/3 m-12 accent-sky-600"}
            min={5}
            max={4 * 60}
            value={timer.time / 60}
            onInput={(v) => setTimer("time", v.target.valueAsNumber * 60)}
        />
    );
}
