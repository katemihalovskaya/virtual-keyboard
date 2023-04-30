const keyLayout = {
    en: ["§","1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
        "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
        "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\\", "enter",
        "left-shift", "`", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "up", "right-shift",
        "control", "option", "command", "space", "command", "option", "left", "down", "right"],
    ru: ["§","1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
        "tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
        "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "ё", "enter",
        "left-shift", "]", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "/", "up", "right-shift",
        "control", "option", "command", "space", "command", "option", "left", "down", "right"]
}

window.addEventListener("DOMContentLoaded", function () {
    initTextarea();
    initKeyboard();
});

function initTextarea() {
    let textarea = document.createElement("textarea");
    textarea.classList.add("textarea");
    document.body.appendChild(textarea);
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
    console.log(main);
    document.body.appendChild(main);

}

let capsLock = false;
let textareaValue;

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
        keyElement.classList.add("keyboard__key");

        switch (key) {
            case "backspace":
                keyElement.classList.add("keyboard__key_wide");
                keyElement.innerHTML = createIconHTML("backspace");
                keyElement.addEventListener("click", () => {
                    let value = document.querySelector('textarea').value;
                    value = value.substring(0, value.length - 1);
                    document.querySelector('textarea').innerHTML = value;
                });
            break;

            case "tab":
                keyElement.innerHTML = createIconHTML("keyboard_tab");

            break;

            case "command":
                keyElement.innerHTML = createIconHTML("keyboard_command_key");

            break;

            case "right-shift":
                keyElement.innerHTML = createSymbolHTML("shift");

            break;

            case "left-shift":
                keyElement.innerHTML = createSymbolHTML("shift");

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

            case "caps":
                keyElement.classList.add("keyboard__key_activatable");
                keyElement.innerHTML = createIconHTML("keyboard_capslock");
                keyElement.addEventListener("click", () => {
                    keyElement.classList.toggle("keyboard__key_active");
                    toggleCapsLock();
                });

                break;

            case "enter":
                keyElement.classList.add("keyboard__key_wide");
                keyElement.innerHTML = createIconHTML("keyboard_return");
                keyElement.addEventListener("click", () => {
                    document.querySelector('textarea').innerHTML += "\n";
                });

                break;

            case "space":
                keyElement.classList.add("keyboard__key_extra-wide");
                keyElement.innerHTML = createIconHTML("space_bar");
                keyElement.addEventListener("click", () => {
                    document.querySelector('textarea').innerHTML += " ";
                });
                break;

            default:
                keyElement.textContent = key.toLowerCase();

                keyElement.addEventListener("click", () => {
                    document.querySelector('textarea').innerHTML += capsLock ? key.toUpperCase() : key.toLowerCase();
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
    let keys = document.body.querySelectorAll(".keyboard__key");
    for (const key of keys) {
        if (key.childElementCount === 0) {
            key.textContent = capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
        }
    }
}


