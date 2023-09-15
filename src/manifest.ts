import {defineManifest} from "@crxjs/vite-plugin";
import packageJson from "../package.json";

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = "0"] = packageJson.version
    // can only contain digits, dots, or dash
    .replace(/[^\d.-]+/g, "")
    // split into version parts
    .split(/[.-]/);

const manifest = defineManifest(async () => ({
    manifest_version: 3,
    name: packageJson.displayName ?? packageJson.name,
    version: `${major}.${minor}.${patch}.${label}`,
    description: packageJson.description,
    permissions: [
        "nativeMessaging",
        "webRequest",
        "storage",
        "tabs",
        "activeTab",
        "notifications",
        "declarativeNetRequest"
    ],
    options_page: "src/pages/options/index.html",
    background: {
        service_worker: "src/pages/background/index.ts"
    },
    action: {
        default_icon: "icons/34x34.png",
        default_popup: "src/pages/popup/index.html",
    },
    chrome_url_overrides: {
        newtab: "src/pages/newtab/index.html",
    },
    // devtools_page: "src/pages/devtools/index.html",
    host_permissions: [
        "*://localhost/*",
    ],
    icons: {
        "128": "icons/128x128.png",
    },
    content_scripts: [
        {
            matches: ["*://*/*", "https://*/*", "http://localhost:4455/*", "<all_urls>"],
            js: ["src/pages/content/index.tsx"],
        },
    ],
    web_accessible_resources: [
        {
            resources: ["assets/js/*.js", "assets/css/*.css", "assets/img/*"],
            matches: ["*://*/*"],
        },
    ],
}));

export default manifest;
