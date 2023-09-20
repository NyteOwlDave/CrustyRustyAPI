
/*

    The 🔀 Requirements 📦 Module
        Takes care of dynamically loading scripts

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

// ❌ To be listed
const ncs_require = (arg, caller) => {
    const basename = url => {
        const parts = String(url).split('/');
        return parts.pop();
    }
    if (typeof caller != 'string') {
        throw `I need to know who's calling me!`;
    } else {
        caller = basename(caller);
    }
    const iter = o => (typeof o[Symbol.iterator] == 'function');
    let count = 0;
    const go = url => {
        const api = basename(url);
        console.info(`🔀📥 Require:`, api, `By: ${caller}`);
        const s = `<script src="${url}"></script>`;
        document.write(s);
        count += 1;
    }
    if ("string" === typeof arg) {
        go(arg);
    } else if (iter(arg)) {
        for (url of arg) go(url);
    } else if ("object" === typeof arg) {
        for (let name in arg) {
            if ("string" === typeof arg[name]) {
                go(arg[name]);
            }
        }
    } else {
        console.warn("🚨 Cannot require type:", typeof arg);
    }
    return count;
}

// ❌ To be listed
ncs_require.is_type = (arg, type) => {
    return (typeof arg === type);
}

// ❌ To be listed
ncs_require.is_iterable = arg => {
    if (arg) {
        return is_type(arg[Symbol.iterator], 'function');
    } else {
        return false;
    }
}

// ❌ To be listed
console.log(`🦏🔀 Script require loaded!`);

