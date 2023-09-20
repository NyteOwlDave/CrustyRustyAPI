
/*

    The 🛠️ Utilities 📦 Module
      Odd bis and pieces that don't really fit
      in anywhere else.

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
Array.flatten = function(arr) {
    let result = [];
    function add(elem) {
      if (Array.isArray(elem)) {
        elem.forEach(add);
      } else {
        result.push(elem);
      }
    }
    add(arr);
    return result;  
}

// ❌ Not yet listed
const echo = o => {
    console.log(o);
}

// ❌ Not yet listed
const convertUnicodeToText = unicodeValue => {

    // Split the Unicode value into two parts: the prefix U+ and the four-digit number.
    const parts = unicodeValue.split("+");

    // Get the four-digit number.
    const number = parts[1];

    // Convert the number to a decimal value.
    const decimalValue = parseInt(number, 16);

    // Return the character corresponding to the decimal value.
    return String.fromCharCode(decimalValue);

}

// ❌ Not yet listed
console.log(`🛠️📥 Utils loaded!`);
