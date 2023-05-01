const keyLayout = {
  en: ['§', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
    'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',
    'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', '\\', 'Enter',
    'ShiftLeft', '`', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'ArrowUp', 'ShiftRight',
    'ControlLeft', 'AltLeft', 'MetaLeft', 'Space', 'MetaRight', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
  ru: ['§', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
    'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
    'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'ё', 'Enter',
    'ShiftLeft', ']', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '/', 'ArrowUp', 'ShiftRight',
    'ControlLeft', 'AltLeft', 'MetaLeft', 'Space', 'MetaRight', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
  shift: {
    en: ['±', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace',
      'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}',
      'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '"', '|', 'Enter',
      'ShiftLeft', '~', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?', 'ArrowUp', 'ShiftRight',
      'ControlLeft', 'AltLeft', 'MetaLeft', 'Space', 'MetaRight', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
    ru: ['<', '!', '"', '№', '%', ':', ',', '.', ';', '(', ')', '_', '+', 'Backspace',
      'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'Ъ',
      'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'ё', 'Enter',
      'ShiftLeft', '[', 'Я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '?', 'ArrowUp', 'ShiftRight',
      'ControlLeft', 'AltLeft', 'MetaLeft', 'Space', 'MetaRight', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
  },
};

let keys;
let textArea;
let shift = false;
let capsLock = false;
let keyPressed = {};

function getLanguage() {
    let lang = localStorage.getItem('language');
    return lang ? lang : 'en';
}

function saveLanguage(lang) {
    localStorage.setItem('language', lang);
}

function toggleCapsLock(key) {
  capsLock = !capsLock;
  key.classList.toggle('keyboard__key_active');
  for (let i = 0; i < keys.length; i += 1) {
    if (keys[i].childElementCount === 0) {
      keys[i].textContent = capsLock
        ? keys[i].textContent.toUpperCase() : keys[i].textContent.toLowerCase();
    }
  }
}

function toggleShift(lang) {
  shift = !shift;
  for (let i = 0; i < keys.length; i += 1) {
    if (shift) {
      if (keys[i].childElementCount === 0) {
        keys[i].textContent = keyLayout.shift[lang][i].toUpperCase();
      }
    } else if (keys[i].childElementCount === 0) {
      keys[i].textContent = keyLayout[lang][i];
    }
  }
}

function toggleLanguage() {
    lang = getLanguage() === 'en' ? 'ru' : 'en';
    for (let i = 0; i < keys.length; i += 1) {
        if (keys[i].childElementCount === 0) {
          keys[i].textContent = keyLayout[lang][i];
        }
      }
    saveLanguage(lang);
}

function insertTab() {
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    textArea.value = textArea.value.substring(0, start) + "\t" + textArea.value.substring(end);
    textArea.selectionStart = textArea.selectionEnd = start + 4;
}

function navigate(key) {
    switch(key) {
        case 'ArrowLeft':
            if (textArea.selectionStart > 0) {
                textArea.selectionStart -= 1;
                textArea.selectionEnd = textArea.selectionStart;
            }
            break;
        case 'ArrowUp':
            const lineStart = textArea.value.lastIndexOf("\n", textArea.selectionStart - 1);
            if (lineStart >= 0) {
                const lineEnd = textArea.value.indexOf("\n", textArea.selectionStart);
                textArea.selectionStart = lineStart + (textArea.selectionStart - lineStart) % (lineEnd - lineStart);
                textArea.selectionEnd = textArea.selectionStart;
            }
            break;
        case 'ArrowRight':
            if (textArea.selectionEnd < textArea.value.length) {
                textArea.selectionEnd += 1;
                textArea.selectionStart = textArea.selectionEnd;
            }
            break;
        case 'ArrowDown':
            const lineEnd = textArea.value.indexOf("\n", textArea.selectionEnd);
            if (lineEnd >= 0) {
                const lineStart = textArea.value.lastIndexOf("\n", textArea.selectionEnd - 1);
                textArea.selectionEnd = lineStart + (textArea.selectionEnd - lineStart) % (lineEnd - lineStart);
                textArea.selectionStart = textArea.selectionEnd;
            }
            break;         
    }
}

function insertLineBreak(lang, key) {
    if(lang === 'en') {
        return ['Backspace', ']', 'Enter', 'ShiftRight'].indexOf(key) !== -1;
    } else {
        return ['Backspace', 'Enter', 'ShiftRight', 'ъ'].indexOf(key) !== -1;
    }
}

function createKeys(lang) {
  const fragment = document.createDocumentFragment();

  // Creates HTML for an icon
  const createIconHTML = (iconName) => `<i class="material-icons">${iconName}</i>`;

  // Creates HTML for an symbol
  const createSymbolHTML = (symbolName) => `<i class="material-symbols-outlined">${symbolName}</i>`;

  keyLayout[lang].forEach((key) => {
    const keyElement = document.createElement('button');

    // Add attributes/classes
    keyElement.setAttribute('type', 'button');
    keyElement.setAttribute('keyName', key);
    keyElement.classList.add('keyboard__key');

    switch (key) {
      case 'Backspace':
        keyElement.classList.add('keyboard__key_wide');
        keyElement.innerHTML = createIconHTML('backspace');
        keyElement.addEventListener('click', () => {
          const { value } = textArea;
          textArea.value = value.substring(0, value.length - 1);
        });
        break;
      case 'Tab':
        keyElement.innerHTML = createIconHTML('keyboard_tab');
        keyElement.addEventListener('click', (e) => {
            e.preventDefault();
            insertTab();
          });
        break;
      case 'MetaLeft':
      case 'MetaRight':
        keyElement.innerHTML = createIconHTML('keyboard_command_key');
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        keyElement.innerHTML = createSymbolHTML('shift');
        keyElement.addEventListener('mousedown', () => toggleShift(getLanguage()));
        keyElement.addEventListener('mouseup', () => toggleShift(getLanguage()));
        break;
      case 'AltLeft':
      case 'AltRight':
        keyElement.innerHTML = createIconHTML('keyboard_option_key');
        break;
      case 'ControlLeft':
        keyElement.innerHTML = createIconHTML('keyboard_control_key');
        break;
      case 'ArrowLeft':
        keyElement.innerHTML = createIconHTML('keyboard_arrow_left');
        break;
      case 'ArrowRight':
        keyElement.innerHTML = createIconHTML('keyboard_arrow_right');
        break;
      case 'ArrowUp':
        keyElement.innerHTML = createIconHTML('keyboard_arrow_up');
        break;
      case 'ArrowDown':
        keyElement.innerHTML = createIconHTML('keyboard_arrow_down');
        break;
      case 'CapsLock':
        keyElement.classList.add('keyboard__key_activatable');
        keyElement.innerHTML = createIconHTML('keyboard_capslock');
        keyElement.addEventListener('click', (e) => toggleCapsLock(e.currentTarget));
        break;
      case 'Enter':
        keyElement.classList.add('keyboard__key_wide');
        keyElement.innerHTML = createIconHTML('keyboard_return');
        keyElement.addEventListener('click', () => {
          textArea.value += '\n';
        });
        break;
      case 'Space':
        keyElement.classList.add('keyboard__key_extra-wide');
        keyElement.innerHTML = createIconHTML('space_bar');
        keyElement.addEventListener('click', () => {
          textArea.value += ' ';
        });
        break;
      default:
        keyElement.textContent = key.toLowerCase();
        keyElement.addEventListener('click', () => {
            key = capsLock ? key.toUpperCase() : key.toLowerCase();
            /* textArea.value = textArea.value.substring(0, textArea.selectionStart) + key + textArea.value.substring(textArea.selectionEnd); */
            textArea.value += key;
        });
        break;
    }

    keyElement.addEventListener('click', () => navigate(key));

    keyElement.addEventListener('mousedown', () => {
        keyElement.classList.add('keyboard__key_press');
    });
    keyElement.addEventListener('mouseup', () => {
      keyElement.classList.remove('keyboard__key_press');
      keyElement.classList.add('keyboard__key_up');
      animation(keyElement);
    });

    fragment.appendChild(keyElement);

    if (insertLineBreak(getLanguage(), key)) {
      fragment.appendChild(document.createElement('br'));
    }
  });
  return fragment;
}

function initKeyboard() {
  // Create main elements
  const main = document.createElement('div');
  const keysContainer = document.createElement('div');

  // Setup main elements
  main.classList.add('keyboard');
  keysContainer.classList.add('keyboard__keys');
  keysContainer.appendChild(createKeys(getLanguage()));

  // Add to DOM
  main.appendChild(keysContainer);
  document.body.appendChild(main);

  keys = document.body.querySelectorAll('.keyboard__key');
}

function initTextarea() {
  textArea = document.createElement('textarea');
  textArea.classList.add('textarea');
  textArea.setAttribute('rows', '18');
  document.body.appendChild(textArea);
}

function initComments() {
    let comments = document.createElement('div');
    comments.classList.add('comments');
    comments.innerHTML = `Клавиатура создана в операционной системе MacOS <br>
                          Для переключения языка комбинация: левыe control(ctrl) + option(alt)`
    document.body.appendChild(comments);
}

window.addEventListener('keydown', (e) => {
  const currentKeyCode = e.code;
  const currentKeyName = e.key.toLowerCase();
  keyPressed[currentKeyCode] = true;
  for (let i = 0; i < keys.length; i += 1) {
    const keyName = keys[i].getAttribute('keyname');
    if (currentKeyCode === keyName || currentKeyName === keyName) {
      keys[i].classList.add('keyboard__key_press');
      switch(currentKeyCode) {
        case 'ShiftLeft':
        case 'ShiftRight':
            toggleShift(getLanguage());
            break;
        case 'CapsLock':
            toggleCapsLock(keys[i]);
            break;
        case 'Enter':
            e.preventDefault();
            textArea.value += '\n';
            break;
        case 'Space':
            e.preventDefault();
            textArea.value += ' ';
            break;
        case 'Backspace':
            e.preventDefault();
            const { value } = textArea;
            textArea.value = value.substring(0, value.length - 1);
            break;
        case 'Tab':
            e.preventDefault();
            insertTab();
      }
      if (keyPressed['ControlLeft'] && keyPressed['AltLeft']) {
        toggleLanguage();
      }
      navigate(currentKeyCode);
    }
  }
});

function animation(key) {
  setTimeout(() => {
    key.classList.remove('keyboard__key_up');
  }, 200);
}

window.addEventListener('keyup', (e) => {
  const currentKeyCode = e.code;
  const currentKeyName = e.key.toLowerCase();
  keyPressed[currentKeyCode] = false;
  for (let i = 0; i < keys.length; i += 1) {
    const keyName = keys[i].getAttribute('keyname');
    if (currentKeyCode === keyName || currentKeyName === keyName) {
      keys[i].classList.remove('keyboard__key_press');
      keys[i].classList.add('keyboard__key_up');
      if (currentKeyCode === 'ShiftLeft' || currentKeyCode === 'ShiftRight') {
        toggleShift(getLanguage());
      }
      if (currentKeyCode === 'CapsLock') {
        toggleCapsLock(keys[i]);
      }
    }
    animation(keys[i]);
  }
});

function init() {
  initTextarea();
  initComments();
  initKeyboard();
}

window.addEventListener('DOMContentLoaded', init);
