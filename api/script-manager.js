
/*

    The Script 🕵🏻 Manager 📦 Module
        Takes care of dynamically loading and unloading
        scripts, listing loaded scripts, locating or
        verifying loaded scripts, etc.

    🔀 Requires:
        🗒️ (placeholder)

*/

// ✅ Listed
// ❌ To be listed
// 🔥 TODO/Incomplete
// 🌎 Global
// 👩‍🦱 Instance
// 👨‍👩‍👧 Shared
// 💎 Class Definition
// 🟣 Primitive object
// 🧮 Array
// 🌀 Iterator/Generator
// 🔆 Function/method
// 🌟 Variable/property
// ✨ Code
// 🗃️ Module Group
// 📦 Module
// 👁️‍🗨️ Argument List
// 🫐 Argument
// 🔗 Hyperlink

// ❌ Not yet listed
// Whether an HTML element has an attribute
const has_attribute = (elem, attr) => {
    return (typeof elem.getAttribute(attr) == "string");
}
  
// ❌ Not yet listed
// Returns the source URL of all loaded scripts
const loaded_scripts = () => {
    let scripts = document.querySelectorAll("script");
    scripts = [... scripts];
    return [... scripts].map(script=>{
        const src = script.getAttribute("src");
        if (!src || src.length < 1) return "";
        return src;
    }).filter(s=>s.length);
}

// ❌ Not yet listed
// Reports all loaded scripts to the console
const report_loaded_scripts = () => {
    function compose(script) {
        let title = script.getAttribute("src");
        if (!title) title = script.getAttribute("name");
        if (!title) title = script.getAttribute("id");
        if (!title) title = "(unidentified)";
        if (has_attribute(script, "system")) {
        return `🔒 ${title}`;
        } else {
        return `👨‍💼 ${title}`;
        }
    }
    const scripts = [... document.querySelectorAll("script")]
        .map(compose);
    console.group("Legend");
    [
        '🔒 = System (protected)',
        '👨‍💼 = User (unloadable)'
    ].forEach(s=>console.log(s));
    console.groupEnd();
    console.group("Loaded Scripts");
    console.log(scripts);
    console.groupEnd();
    return "🔔";
}

// ❌ Not yet listed
// Loads the specified script
const load_script = (path, callback) => {
    const fn = f => (typeof f == 'function');
    if (!path.endsWith(".js")) {
        console.log("🚨 Filename extension must be '.js'");
        return "🚨"
    }
    if (is_script_loaded(path)) {
        console.log("✅ Already added");
        if (fn(callback)) callback(path);
        return "✅";
    }
    const script = document.createElement("script");
    document.body.appendChild(script);
    script.onload = function(evt) {
        console.log("✅ Added", path);
        if (fn(callback)) callback(path, evt);
        return true;
    }
    script.onerror = function(evt) {
        console.log("🚨 Failed to add", path);
        document.body.removeChild(script);
        return true;
    }
    script.src = path;
    return "⏲️";
}

// ❌ Not yet listed
// Composes a full or relative pathname for a script
const compose_script_name = (folder, file) => {
    return `${folder}/${file}.js`;
}

// ❌ Not yet listed
// Determines whether a script is loaded
const is_script_loaded = path => {
    return find_script(path) ? true : false;
}

// ❌ Not yet listed
// Locates a script by it's source URL
// If found, returns the <script> element
const find_script = path => {
    const qry = `script[src='${path}']`;
    return document.body.querySelector(qry);
}

// ❌ Not yet listed
// Determines if a script has the "system"
// attribute, indicating it should be protected
const is_script_protected = path => {
    const script = find_script(path);
    if (script) {
        return has_attribute(script, "system");
    } else {
        return false;
    }
}

// ❌ Not yet listed
// Unloads an unprotected script (if found)
const unload_script = path => {
    if (is_script_protected(path)) {
        console.info("🚨 Can't unload protected script");
        return "🚫";
    }
    const script = find_script(path);
    if (script) {
        const parent = script.parentElement;
        parent.removeChild(script);
        console.info("✅ Removed", path);
        return "🆗";  
    } else {
        console.info("🚨 Can't find that script", path);
        return "🚫";
    }
}

// ❌ Not yet listed
console.log(`🕵🏻📥 Script manager loaded!`);
