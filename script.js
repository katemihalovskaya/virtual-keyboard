const keyLayout = {
    en: ["§","1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
        "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
        "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\\", "Enter",
        "ShiftLeft", "`", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "up", "ShiftRight",
        "control", "option", "MetaLeft", "Space", "MetaRight", "option", "left", "down", "right"],
    ru: ["§","1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Backspace",
        "Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
        "CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "ё", "Enter",
        "ShiftLeft", "]", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "/", "up", "ShiftRight",
        "control", "option", "MetaLeft", "Space", "MetaRight", "option", "left", "down", "right"],
    shift: {
        en: ["±","!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "Backspace",
            "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}",
            "CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", "\"", "|", "Enter",
            "ShiftLeft", "~", "z", "x", "c", "v", "b", "n", "m", "<", ">", "?", "up", "ShiftRight",
            "control", "option", "MetaLeft", "Space", "MetaRight", "option", "left", "down", "right"],
        ru: ["<","!", "\"", "№", "%", ":", ",", ".", ";", "(", ")", "_", "+", "Backspace",
            "Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "Ъ",
            "CapsLock", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Ё", "Enter",
            "ShiftLeft", "[", "Я", "ч", "с", "м", "и", "т", "ь", "б", "Ю", "?", "up", "ShiftRight",
            "control", "option", "MetaLeft", "Space", "MetaRight", "option", "left", "down", "right"]
    }
}

let keys;
let textArea;
let shift = false
let capsLock = false;

window.addEventListener("DOMContentLoaded", init);

function init() {
    initTextarea();
    initKeyboard();
}

function initTextarea() {
    textArea = document.createElement("textarea");
    textArea.classList.add("textarea");
    document.body.appendChild(textArea);
}

function initKeyboard() {
    // Create main elements
    let main = document.createElement("div");
    let keysContainer = document.createElement("div");

    // Setup main elements
    main.classList.add("keyboard");
    keysContainer.classList.add("keyboard__keys");
    keysContainer.appendChild(createKeys());

    // Add to DOM
    main.appendChild(keysContainer);
    document.body.appendChild(main);

    keys = document.body.querySelectorAll(".keyboard__key");
}

function createKeys(lang = "en") {
    const fragment = document.createDocumentFragment();
    
    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
        return `<i class="material-icons">${icon_name}</i>`;
    };

    // Creates HTML for an symbol
    const createSymbolHTML = (symbol_name) => {
        return `<i class="material-symbols-outlined">${symbol_name}</i>`;
    };

    keyLayout[lang].forEach(key => {
        const keyElement = document.createElement("button");
        const insertLineBreak = ["backspace", "]", "enter", "right-shift"].indexOf(key) !== -1;

        // Add attributes/classes
        keyElement.setAttribute("type", "button");
        keyElement.setAttribute("keyName", key);
        keyElement.classList.add("keyboard__key");

        switch (key) {
            case "Backspace":
                keyElement.classList.add("keyboard__key_wide");
                keyElement.innerHTML = createIconHTML("backspace");
                keyElement.addEventListener("click", () => {
                    let value = textArea.value;
                    textArea.value = value.substring(0, value.length - 1);
                });
                break;
            case "Tab":
                keyElement.innerHTML = createIconHTML("keyboard_tab");
                break;
            case "MetaLeft":
            case "MetaRight":
                keyElement.innerHTML = createIconHTML("keyboard_command_key");
                break;
            case "ShiftLeft":
            case "ShiftRight":
                keyElement.innerHTML = createSymbolHTML("shift");
                keyElement.addEventListener('mousedown', () => toggleShift());
                keyElement.addEventListener('mouseup', () => toggleShift());
                break;
            case "option":
                keyElement.innerHTML = createIconHTML("keyboard_option_key");
                break;
            case "control":
                keyElement.innerHTML = createIconHTML("keyboard_control_key");
                break;
            case "left":
                keyElement.innerHTML = createIconHTML("keyboard_arrow_left");
                break;
            case "right":
                keyElement.innerHTML = createIconHTML("keyboard_arrow_right");
                break;
            case "up":
                keyElement.innerHTML = createIconHTML("keyboard_arrow_up");
                break;
            case "down":
                keyElement.innerHTML = createIconHTML("keyboard_arrow_down");
                break;
            case "CapsLock":
                keyElement.classList.add("keyboard__key_activatable");
                keyElement.innerHTML = createIconHTML("keyboard_capslock");
                keyElement.addEventListener("click", () => {
                    keyElement.classList.toggle("keyboard__key_active");
                    toggleCapsLock();
                });
                break;
            case "Enter":
                keyElement.classList.add("keyboard__key_wide");
                keyElement.innerHTML = createIconHTML("keyboard_return");
                keyElement.addEventListener("click", () => {
                    textArea.value += "\n";
                });
                break;
            case "Space":
                keyElement.classList.add("keyboard__key_extra-wide");
                keyElement.innerHTML = createIconHTML("space_bar");
                keyElement.addEventListener("click", () => {
                    textArea.value += " ";
                });
                break;
            default:
                keyElement.textContent = key.toLowerCase();
                keyElement.addEventListener("click", () => {
                    textArea.value += capsLock ? key.toUpperCase() : key.toLowerCase();
                });
                break;
        }

        fragment.appendChild(keyElement);

        if (insertLineBreak) {
            fragment.appendChild(document.createElement("br"));
        }
    });

    return fragment;
}

function toggleCapsLock() {
    capsLock = !capsLock;
    for (const key of keys) {
        if (key.childElementCount === 0) {
            key.textContent = capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
        }
    }
}

function toggleShift(lang = "en") {
    shift = !shift;
    for(let i = 0; i < keys.length; i++) {
        if (shift) {
            if (keys[i].childElementCount === 0) {
                keys[i].textContent = keyLayout['shift'][lang][i].toUpperCase();
            }
        } else {
            if (keys[i].childElementCount === 0) {
                keys[i].textContent = keyLayout[lang][i];
            }
        }
    }
}


window.addEventListener('keydown', (e) => {
    for(let i = 0; i < keys.length; i++) {
        let currentKeyCode = e.code;
        let currentKeyName = e.key.toLowerCase();
        let keyName = keys[i].getAttribute('keyname');
        if(currentKeyCode == keyName || currentKeyName == keyName) {
            keys[i].classList.add('keyboard__key_press');
        }
    }
})

window.addEventListener('keyup', function(e) {
    for(let i = 0; i < keys.length; i++) {
        let currentKeyCode = e.code;
        let currentKeyName = e.key.toLowerCase();
        let keyName = keys[i].getAttribute('keyname');
        if(currentKeyCode == keyName || currentKeyName == keyName) {
            keys[i].classList.remove('keyboard__key_press');
            keys[i].classList.add('keyboard__key_up')
        }
        setTimeout(()=> {
            keys[i].classList.remove('keyboard__key_up')
        },200)
    }
})