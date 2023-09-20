
/*

    🚨 THIS IS INCOMPLETE!!!

*/

throw ("🚨 THIS IS INCOMPLETE!")

// Wrapper for an HTML element
class ElementContainer {
    constructor(type, text) {
        this.elem = el(type, text);
    }
    get id() {
        return this.elem.getAttribute("id");
    }
    set id(value) {
        this.elem.setAttribute("id", value)
        return this;
    }
    get value() {
        return this.elem.value;
    }
    set value(n) {
        this.elem.value = n;
        return this;
    }
    addEvent(event, callback) {
        this.elem.addEventListener(event, callback);
        return this;
    }
    addChild(child) {
        if (child instanceof ElementContainer) {
            child = child.elem;
        }
        this.elem.appendChild(child);
        return this;
    }
    get innerText() {
        return this.elem.innerText;
    }
    get innerHTML() {
        return this.elem.innerHTML;
    }
    get outerHTML() {
        return this.elem.outerHTML;
    }
    get parent() {
        return this.elem.parentElement;
    }
    set innerText(s) {
        this.elem.innerText = String(s);
        return this;
    }
    set innerHTML(s) {
        this.elem.innerHTML = String(s);
        return this;
    }
    set outerHTML(s) {
        throw "Not possible, dude!"
    }
    set parent(elem) {
        if (this.parent) {
            this.parent.removeChild(this.elem);
        }
        while (elem instanceof ElementContainer) {  
            elem = elem.elem;
        }
        elem.appendChild(this.elem);
        return this;
    }
    get attributes() {
        return this.elem.attributes;
    }
}
// Matches an HTML block element (naive)
// e.g. <tag>Content</tag>
// https://chat.openai.com/share/c6f769ce-78df-4643-9c7e-fc8581160f76
ElementContainer.matchHTML = (s, tagName) => {
    const regex = new RegExp(`<${tagName}>.*?</${tagName}>`, 'i');
    return regex.test(s);
}
// Matches a block header
// e.g. [[ Content ]]
// https://regex101.com/r/eu3Iy3/2
// https://regex101.com/r/lPlxHW/1
ElementContainer.matchBlock = (s, opener='[[', closer=']]') => {
    const space="(\s*)";
    const key="(.+)";
    const rex = [
        `^`,
        `${space}`,
        `${opener}`,
        `${space}`,
        `${key}`,
        `${space}`,
        `${closer}`,
        `${space}`,
        `$`
    ].join("");
    const regex = new RegExp(rex, 'i');
    return regex.test(s);
}
// Matches list/ini style key/value pair
// e.g. key value
// e.g. key = value
// e.g. key : value
// https://chat.openai.com/share/c6f769ce-78df-4643-9c7e-fc8581160f76
// https://regex101.com/r/NcyPjX/1
ElementContainer.matchList = (s, sep=',', allow_empty=true) => {
    const space = "(\s*)";
    const key = "(.+)";
    const value = allow_empty ? "(.*)" : key;
    const rex = [
        `^`,
        `${space}`,
        `${key}`,
        `${space}`,
        `${sep}`,
        `${space}`,
        `${value}`,
        `${space}`,
        `$`
    ].join("");
    const regex = new RegExp(rex, 'i');
    return regex.test(s);
}
// Matches Anthem descriptor
// e.g. |key| = value
ElementContainer.matchAnthem = (s, tagName) => {
    const space="(\s*)";
    const key="(.+)";
    const value="(.*)";
    const rex = [
        `^`,
        `${space}`,
        `${opener}`,
        `${space}`,
        `${key}`,
        `${space}`,
        `${closer}`,
        `${space}`,
        `${sep}`,
        `${space}`,
        `${value}`,
        `${space}`,
        `$`
    ].join("");
    const regex = new RegExp(rex, 'i');
    return regex.test(s);
}
// Matches CSV descriptor (naive)
ElementContainer.matchCSV = (s, sep=',') => {

    const regex = new RegExp(rex, 'i');
    return regex.test(s);
}

// Integer Input Control
class InputInteger extends ElementContainer {
    constructor(id, value, min, max, placeholder) {
        super("input");
        super.id = id;
        super.value = value;
        const ctrl = this.elem;
        ctrl.setAttribute("min", min);
        ctrl.setAttribute("max", max);
        ctrl.setAttribute("placeholder", placeholder);
    }
}

class TableCell extends ElementContainer {
    constructor(contents, ishtml=false) {
        super("td");
        if (contents instanceof HTMLElement) {
            this.elem.appendChild(contents);
        } else if (ishtml) {
            this.elem.innerHTML = String(contents);
        } else {
            this.elem.innerText = String(contents);
        }
    }
}

class TableRow {
    constructor(contents) {
        super("tr");
        add(contents);
    }
    // Generaul purpose
    add(contents) {
        if (contents instanceof TableCell) {
            this.addChild(contents);
        } else if (contents instanceof HTMLElement) {
            this.addChild(contents);
        } else if (typeof contents[Symbol.iterator] == "function") {
            const items = [... contents];
            items.forEach(o=>this.add(o));
        } else if (contents.hasOwnProperty('count')) {
            this.addCells(contents.count);
        } else {
            const cell = new TableCell(contents);
            this.add(cell);
        }
        return this;
    }
    // Add N empty cells
    addCells(count) {
        while(count-- > 0) {
            this.add(new TableCell());
        }
        return this;
    }
    // Add a single cell with a control element in it
    addControl(ctrl) {
        return this.add(new TableCell(ctrl));
    }
    // Add cells with a control elements inside
    addControls(ctrls) {
        for (ctrl in ctrls) {
            this.addControl(ctrl);
        }
        return this;
    }
    // Add a single cell with inner text
    // or just the inner text
    addText(text, nocell=false) {
        if (nocell) {
            this.add(new TableCell(text));
        } else {
            this.innerText = text;
        }
        return this;
    }
    // Add a single cell with inner html
    // or just the inner html
    addHTML(html, nocell=false) {
        if (nocell) {
            this.add(new TableCell(html, true));
        } else {
            this.innerHTML = html;
        }
        return this;    
    }
    // Add from Markdown, CSV, TSV, etc.
    // e.g. "|a|b|" adds two cells containing a and b
    addMD(mds, sep='|') {
    
    }
    // Parses an anthem descriptor (key/value pair)
    addAnthem(desc, opener='|', closer='|', sep='=') {
        
    }
    // Parses a list/ini descriptor (key/value pair)
    addList(md, sep=' ') {
        
    }
    // Parses an enclosed block
    addBlock(md, opener='[[', closer=']]') {
    }
}

class Table {
    constructor(size, header, footer) {
        this.make_header(header);
        this.make_body(size);
        this.make_footer(footer);
    }
    make_header(header) {
        if (!header) return this;
        const e = el("thead");
        e.innerHTML = String(header);
        super.addChild(e);
        return this;
    }    
    make_footer(footer) {
        if (!footer) return this;
        const e = el("tfoot");
        e.innerHTML = String(footer);
        super.addChild(e);
        return this;
    }
    make_body(size) {
        if (!size) return this;
        return this;
    }
}

