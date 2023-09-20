
/*

    The 🖱️ ClickableFieldSet 💎 Class
        Those fancy fieldset that can be collapsed
        and their content hidden by clicking on the
        associated legend element

    🔀 Requires:
        🗒️ require.js    

// Remember to include pretty.css & blue-white.css
    🔀 Requires:
        🗒️ (todo)

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
class ClickableFieldset {
    constructor(fieldset) {
        this.fieldset = fieldset;
        this.init();
        ClickableFieldset.init_all();
        ClickableFieldset.list.push(this);
    }
    init() {
        const me = this;
        this.legend = this.fieldset.querySelector("legend[clickable]");
        this.section = this.fieldset.querySelector("section[hidable]");
        this.legend.onclick = function(evt) {
            me.toggle_section();
        }
    }
    hide_section() {
        if (this.section) ClickableFieldset.hide(this.section);
    }
    show_section() {
        if (this.section) ClickableFieldset.show(this.section);        
    }
    toggle_section() {
        if (this.section) ClickableFieldset.toggle(this.section);        
    }
}

// ❌ Not yet listed
ClickableFieldset.toggle = function(elem) {
    if (elem.style.display == "none") {
        ClickableFieldset.show(elem);
    } else {
        ClickableFieldset.hide(elem);
    }
}

// ❌ Not yet listed
ClickableFieldset.show = function(elem) {
    elem.style.display = "block";    
}

// ❌ Not yet listed
ClickableFieldset.hide = function(elem) {
    elem.style.display = "none";    
}

// ❌ Not yet listed
ClickableFieldset.list = [];

// ❌ Not yet listed
ClickableFieldset.settings = {
    initialized: false
};

// ❌ Not yet listed
ClickableFieldset.init_all = function() {
    const settings = ClickableFieldset.settings;
    if (settings.initialized) return;
    settings.initialized = true;
    const legends = document.body.querySelectorAll("fieldset legend[clickable]");
    function add(legend) {
        new ClickableFieldset(legend.parentElement);
    }
    legends.forEach(add);
};

// ❌ Not yet listed
ClickableFieldset.hide_all = function() {
    ClickableFieldset.list.forEach(e=>e.hide_section());
}

// ❌ Not yet listed
ClickableFieldset.show_all = function() {
    ClickableFieldset.list.forEach(e=>e.show_section());
}

// ❌ Not yet listed
ClickableFieldset.requires = function() {
    function report(s) {
        if (s.endsWith(".css")) {
            console.log(`📑 ${s}`);
        } else
        if (s.endsWith(".js")) {
            console.log(`🗒️ ${s}`);
        } else
        {
            console.log(`🔰 ${s}`);
        }
    }
    console.group("🖱️ ClickableFieldset Requirements")
    ;[
        "pretty.css",
        "blue-white.css"
    ].forEach(report);
    console.groupEnd();
    console.group("🖱️ ClickableFieldset Attributes")
    ;[
        "fieldset[pretty]",
        "legend[clickable]",
        "section[hidable]"
        // "table[pretty]"
        // "table[hidable]"
    ].forEach(s=>{
        console.log(`🔖 ${s}`);
    });
    console.groupEnd();
}

// ❌ Not yet listed
console.log(`🖱️📥 ClickableFieldset loaded!`);
