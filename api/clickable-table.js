
/*

    The 🖱️ ClickableTable 💎 Class
        Those fancy tables with rows that can be
        clicked on to move to a bookmark or open
        another page

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
class ClickableTable {
    constructor(table) {
        ClickableTable.init();
        this.table = table;
        this.init_rows();
        ClickableTable.list.push(this);
    }
    init_rows() {
        let rows = this.table.querySelectorAll("tr[href]");
        if (!rows) return;
        for (let i=0; i<rows.length; i++) {
            rows[i].onclick = function(evt) {
                const tr = evt.target.parentNode;
                const tag = tr.getAttribute("href");
                // console.log({tag});
                let anchor = document.createElement("a");
                anchor.href = tag;
                anchor.click();
            }
        }    
    }
}

// ❌ Not yet listed
ClickableTable.list = [];

// ❌ Not yet listed
ClickableTable.init = function() {
    const settings = ClickableTable.settings;
    if (!settings.styles_set) {
        settings.styles_set = true;
        // Get stylesheet #0
        const stylesheet = document.styleSheets[0];
        settings.styles.forEach(style=>{
            // Get rules length
            const end = stylesheet.cssRules.length - 1;
            // Insert a new rule
            stylesheet.insertRule(style, end);
        });
    }
}

// ❌ Not yet listed
ClickableTable.settings = {
    styles: [ `
    table[clickable] tbody tr[href]:hover {
        cursor: pointer;
        color: yellow;
        box-shadow: inset 0 0 10px gold;
    `
    ], 
    styles_set: false
};

// ❌ Not yet listed
ClickableTable.init_all = function() {
    const tables = document.body.querySelectorAll("table[clickable]");
    tables.forEach(table=>{
        new ClickableTable(table);
    });
}

// ❌ Not yet listed
ClickableTable.requires = function() {
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
    console.group("🖱️ ClickableTable Requirements")
    ;[
        "pretty.css",
        "blue-white.css"
    ].forEach(report);
    console.groupEnd();
    console.group("🖱️ ClickableTable Attributes")
    ;[
        "table[pretty]",
        "table[hidable]"
    ].forEach(s=>{
        console.log(`🔖 ${s}`);
    });
    console.groupEnd();
}

// ❌ Not yet listed
ClickableTable.import = function() {
    function stylesheet(s) {
        const html = `
        <link rel="stylesheet" href="${s}"/>
        `;
        document.write(html);
    }
    ;[
        "assets/blue-white.css",
        "assets/pretty.css",
    ].forEach(stylesheet);
}

// ❌ Not yet listed
console.log(`🖱️📥 ClickableTable loaded!`);
