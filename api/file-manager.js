
/*

    The File 🕵🏻 Manager 📦 Module
        Those fancy tables with rows that can be
        clicked on to move to a bookmark or open
        another page

    🔀 Requires:
        🗒️ util.js

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
// Loads a text document
// Sends a multiline string object to the callback
// Returns FileReader (if arg is File) or Promise
const load_text_file = (arg, onload, onerror=null) => {
    if (arg instanceof File) {
        const rdr = new FileReader();
        rdr.onload = function(e) {
            onload(e.target.result);
        }
        rdr.onerror = function(e) {
            if (onerror) onerror(e);
            console.error(e);
        }
        rdr.readAsText(arg);
        return [rdr];
    }
    else {
        return [
            fetch(arg)
            .then(r=>r.text())
            .then(s=>onload(s))
            .catch(err=>{
                if (onerror) onerror(err);
                console.error(err);
            })
        ];
    }
}

// ❌ Not yet listed
// Returns FileReader (if arg is File) or Promise
const load_json_file = (arg, onload, onerror = null) => {
    if (arg instanceof File) {
        const rdr = new FileReader();
        rdr.onload = function(e) {
            const o = JSON.parse(e.target.result);
            onload(o);
        }
        rdr.onerror = function(e) {
            if (onerror) onerror(e);
            console.error(e);
        }
        rdr.readAsText(arg);
        return [rdr];
    }
    else {
        return [
            fetch(arg)
            .then(r=>r.jspn())
            .then(o=>onload(o))
            .catch(err=>{
                if (onerror) onerror(err);
                console.error(err);
            })
        ];
    }
}

// ❌ Not yet listed
// Returns FileReader (if arg is File) or Promise
const load_blob_file = (arg, onload, onerror = null) => {
    if (arg instanceof File) {
        const rdr = new FileReader();
        rdr.onload = function(e) {
            const blob = new Blob([... e.target.result]);
            onload(blob);
        }
        rdr.onerror = function(e) {
            if (onerror) onerror(e);
            console.error(e);
        }
        rdr.readAsText(arg);
        return [rdr];
    }
    else {
        return [
            fetch(arg)
            .then(r=>r.text())
            .then(s=>onload(s))
            .catch(err=>{
                if (onerror) onerror(err);
                console.error(err);
            })
        ];
    }
}

// ❌ Not yet listed
// Loads an image
// Sends an ImageData object to the callback
// Returns an array containing a reference to the
// orphan <img> element used for loading.
const load_image_file = (arg, onload=null, onerror=null) => {
	const img = el("img");
	function loaded(img) {
        if (typeof onload == 'function') {
            const canvas = el("canvas");
            const w = canvas.width = img.naturalWidth;
            const h = canvas.height = img.naturalHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            onload(ctx.getImageData(0, 0, w, h));    
        } else {
            console.log(`Loaded ${img}`);
        }
	}
	img.onload = function(e) {
		loaded(e.target);
    }
    img.onerror = function(e) {
        if (onerror) onerror(e)
        console.error(e);
    }
    if (arg instanceof File) {
        const rdr = new FileReader();
        rdr.onload = function(e) {
            img.src = e.target.result;
        }
        rdr.onerror = function(e) {
            if (onerror) onerror(e);
            console.error(e);
        }
        rdr.readAsDataURL(arg);
    } else {
        img.src = arg;
    }
	return [img];
}

// ❌ Not yet listed
// Popup to conform filename
const confirm_filename = (filename, caption) => {
    caption = caption || "Filename";
    filename = filename || "unnamed";
    return window.prompt(caption, filename);
}

// ❌ Not yet listed
// Converts arg into a multiline string
// * Arrays are joined with "\n"
// * Other objects are converted with JSON.stringify
const to_text_doc = arg => {
    if (Array.isArray(arg)) {
        return arg.join("\n");
    } 
    else if ("object" === typeof arg) {
        return JSON.stringify(arg, null, 2);
    } 
    else if ("string" === typeof arg) {
        return arg;
    } 
    else if ("undefined" !== arg[Symbol.iterator]) {
        return [... arg].join("\n");
    }
    else {
        return String(arg);
    }
}

// ❌ Not yet listed
// Converts arg to a multiline text doc, then creates a blob
// from that and finally a URL from the blob.
// This is in prep to attaching the URL to an <a> element
// for downloading. 
const doc_to_url = arg => {
    const doc = toTextDoc(arg);
    return URL.createObjectURL(new Blob([doc], {type: "text/plain"}));
}

// ❌ Not yet listed
// Creates a blob from a typed array and then a URL from the blob.
// This is in prep to attaching the URL to an <a> element
// for downloading. 
const typed_array_to_url = details => {
    const array = details.typedArray;
    const mime = details.mimeType;
    return URL.createObjectURL(new Blob([array.buffer], { type: mime }))
}

// ❌ Not yet listed
// Converts an image/canvas to a data URL
// This is in prep to attaching the URL to an <a> element
// for downloading. 
const image_to_url = (img, mimeType="image/jpeg") => {
    if (img instanceof HTMLCanvasElement) {
        return img.toDataURL(mimeType);
    }
    else {
        // Create canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        // Set width and height
        canvas.width = img.width;
        canvas.height = img.height;
        // Drawable or stretchable?
        const fn = (img instanceof ImageData) ? "putImageData" : "drawImage";
        // Blast out them pixels!
        ctx[fn](img, 0, 0);
        // And return as Data URL
        return canvas.toDataURL(mimeType);
    }
}

// ❌ Not yet listed
// Saves a blob to a file
// The blob contains mime type info
// The filename specifies the name to be saved under
// The ask arg is a flag indicating whether to prompt
// user to edit filename or cancel before saving.
// Default filename is "unnamed".
const save_file = (url, filename, ask=false) => {
    if (ask) {
        const s = confirm_filename(filename);
        if (!s) return false;
        filename = s;
    } else {
        filename = ("string" === typeof filename) ? filename : "unnamed";
    }
    const attr = (e,n,v) => e.setAttribute(n,v);
    const a = document.createElement("a");
    a.style.display = "none";
    attr(a, "href", url);
    attr(a, "download", filename);
    a.click();
    return true;
}

// ❌ Not yet listed
// Save a blob file
const save_blob_file = (blob, filename, ask=false) => {
    const url = URL.createObjectURL(blob);
    return save_file(url, filename, ask);
}

// ❌ Not yet listed
// Saves a document to a text file
// The doc arg can be any type
const save_text_file = (doc, filename, ask=false) => {
    // Do the ask here to possibly avoid a long conversion
    if (ask) {
        const s = confirm_filename(filename, "Document Filename");
        if (!s) return false;
        filename = s;
    } else {
        filename = ("string" === typeof filename) ? filename : "unnamed";
    }
    const url = doc_to_url(doc);
    return save_file(url, filename);
}

// ❌ Not yet listed
// Saves a typed array to a file
// The details arg is any object { typedArray:array, mimeType:mime }
// typedArray => Strongly typed array (e.g. Uint8Array)
// mimeType => String mime type (e.g. "image/png")
const save_array_as_text_file = (details, filename, ask=false) => {
    const url = typed_array_to_url(details);
    return save_file(url, filename, ask);
}

// ❌ Not yet listed
// Save an image to a file
// The details arg is any object { source:image, mimeType:mime }
// source => ImageData or CanvasImageSource
// mimeType => String mime type (e.g. "image/png")
const save_image_file = (details, filename, ask=false) => {
    // Do the ask here to possibly avoid a long conversion
    if (ask) {
        const s = confirm_filename(filename, "Image Filename");
        if (!s) return false;
        filename = s;
    } else {
        filename = ("string" === typeof filename) ? filename : "unnamed";
    }
    const url = image_to_url(details.source, details.mimeType);
    return save_file(url, filename);
}

// ❌ Not yet listed
// Handy short form for PNG save
const save_png_file = (img, filename, ask=false) => {
    return save_image_file({
        source : img,
        mimeType : "image/png"
    }, filename + ".png", ask);
}

// ❌ Not yet listed
// Handy short form for JPG save
const save_jpg_file = (img, filename, ask=false) => {
    return save_image_file({
        source : img,
        mimeType : "image/jpeg"
    }, filename + ".jpg", ask);
}

// ❌ Not yet listed
console.log(`🕵🏻📥 File manager loaded!`);
