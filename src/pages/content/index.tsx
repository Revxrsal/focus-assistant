import {render} from "solid-js/web";
import Focus from "@pages/content/focus";
import {onCommand} from "@src/utils/commands";

let rendered = false;

onCommand<{ canAccess: boolean }>("canAccess", ({canAccess}) => {
    if (canAccess || rendered)
        return;

    document.documentElement.innerHTML = "";
    render(Focus, document.documentElement);

    rendered = true;
})