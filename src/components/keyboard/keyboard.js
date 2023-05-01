import './keyboard.scss';

import createKey from '../key/key';
import getKeyCodes from '../../db/keys';

const CssClasses = {
  KEYBOARD: 'keyboard',
  ROW: 'keyboard__row',
};

const KEYBOARD_LAYOUT = [
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6',
    'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI',
    'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK',
    'KeyL', 'Semicolon', 'Quote', 'Enter'],
  ['ShiftLeft', 'Backslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN',
    'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
  ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight',
    'ArrowLeft', 'ArrowDown', 'ArrowRight'],
];

const KeyCodesObject = getKeyCodes();
const lang = 'en';

let textArea = null;
let keyboard = null;
let keysCollection = null;
let isShift = false;
let isCapsLock = false;
let charType = 'default';
let rowsArr = [];
let cursorPosition = null;

function getCursorPosition() {
  cursorPosition = textArea.selectionStart;
}

function keyboardClickHandler(e) {
  getCursorPosition();

  const element = e.target;

  if (element.classList.contains('key')) {
    const { keyCode } = element.dataset;

    if (keyCode === 'CapsLock') {
      if (isCapsLock) {
        isCapsLock = false;
      } else {
        isCapsLock = true;
      }

      if ((isShift && !isCapsLock) || (!isShift && isCapsLock)) charType = 'shift';
      if ((!isShift && !isCapsLock) || (isShift && isCapsLock)) charType = 'default';

      KEYBOARD_LAYOUT.forEach((keyboardRow, rowIndex) => {
        rowsArr[rowIndex].innerHTML = '';

        keyboardRow.forEach((code) => {
          const key = createKey(code, KeyCodesObject, lang, charType);
          rowsArr[rowIndex].append(key);
        });
      });

      keysCollection = keyboard.querySelectorAll('.key');

      keysCollection.forEach((key) => {
        if (key.dataset.keyCode === 'CapsLock') {
          if (isCapsLock) {
            key.classList.add('key_active');
          } else {
            key.classList.remove('key_active');
          }
        }
      });
    }

    if (element.classList.contains('key_char')) {
      const textValue = textArea.value;

      let newText = textValue.slice(0, cursorPosition);
      newText += element.innerText + textValue.slice(cursorPosition);
      textArea.value = newText;
      textArea.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
      getCursorPosition();
    }

    if (keyCode === 'Space') {
      const textValue = textArea.value;

      let newText = textValue.slice(0, cursorPosition - 1);
      const space = ' ';
      newText += space + textValue.slice(cursorPosition - 1);
      textArea.value = newText;
      textArea.setSelectionRange(cursorPosition, cursorPosition);
      getCursorPosition();
    }

    if (keyCode === 'Enter') {
      const textValue = textArea.value;

      let newText = textValue.slice(0, cursorPosition);
      const enter = '\n';
      newText += enter + textValue.slice(cursorPosition);
      textArea.value = newText;
      textArea.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
      getCursorPosition();
    }

    if (keyCode === 'Tab') {
      const textValue = textArea.value;

      let newText = textValue.slice(0, cursorPosition);
      const tab = '    ';
      newText += tab + textValue.slice(cursorPosition);
      textArea.value = newText;
      textArea.setSelectionRange(cursorPosition + 4, cursorPosition + 4);
      getCursorPosition();
    }

    if (keyCode === 'Backspace') {
      const textValue = textArea.value;

      let newText = textValue.slice(0, cursorPosition - 1);
      newText += textValue.slice(cursorPosition);
      textArea.value = newText;
      textArea.setSelectionRange(cursorPosition - 1, cursorPosition - 1);
      getCursorPosition();
    }

    if (keyCode === 'Delete') {
      const textValue = textArea.value;

      let newText = textValue.slice(0, cursorPosition);
      newText += textValue.slice(cursorPosition + 1);
      textArea.value = newText;
      textArea.setSelectionRange(cursorPosition, cursorPosition);
      getCursorPosition();
    }
  }
}

function keyboardMouseDownHandler(e) {
  getCursorPosition();

  const { keyCode } = e.target.dataset;

  if (keyCode === 'ShiftRight' || keyCode === 'ShiftLeft') {
    isShift = true;

    if ((isShift && !isCapsLock) || (!isShift && isCapsLock)) charType = 'shift';
    if ((!isShift && !isCapsLock) || (isShift && isCapsLock)) charType = 'default';

    KEYBOARD_LAYOUT.forEach((keyboardRow, rowIndex) => {
      rowsArr[rowIndex].innerHTML = '';

      keyboardRow.forEach((code) => {
        const key = createKey(code, KeyCodesObject, lang, charType);
        rowsArr[rowIndex].append(key);
      });
    });

    keysCollection = keyboard.querySelectorAll('.key');

    keysCollection.forEach((key) => {
      if (key.dataset.keyCode === keyCode) {
        key.classList.add('key_down');
      }
    });
  }
}

function keyboardMouseUpHandler(e) {
  getCursorPosition();

  const { keyCode } = e.target.dataset;

  if (keyCode === 'ShiftRight' || keyCode === 'ShiftLeft') {
    isShift = false;

    if ((isShift && !isCapsLock) || (!isShift && isCapsLock)) charType = 'shift';
    if ((!isShift && !isCapsLock) || (isShift && isCapsLock)) charType = 'default';

    KEYBOARD_LAYOUT.forEach((keyboardRow, rowIndex) => {
      rowsArr[rowIndex].innerHTML = '';

      keyboardRow.forEach((code) => {
        const key = createKey(code, KeyCodesObject, lang, charType);
        rowsArr[rowIndex].append(key);
      });
    });

    keysCollection = keyboard.querySelectorAll('.key');
  }
}

function keyboardKeyDownHandler(e) {
  getCursorPosition();

  e.preventDefault();
  const keyCode = e.code;

  keysCollection.forEach((key) => {
    if (key.dataset.keyCode === keyCode) {
      key.classList.add('key_down');
    }
  });

  if (!e.repeat) {
    if (keyCode === 'ShiftRight' || keyCode === 'ShiftLeft') {
      isShift = true;

      if ((isShift && !isCapsLock) || (!isShift && isCapsLock)) charType = 'shift';
      if ((!isShift && !isCapsLock) || (isShift && isCapsLock)) charType = 'default';

      KEYBOARD_LAYOUT.forEach((keyboardRow, rowIndex) => {
        rowsArr[rowIndex].innerHTML = '';

        keyboardRow.forEach((code) => {
          const key = createKey(code, KeyCodesObject, lang, charType);
          rowsArr[rowIndex].append(key);
        });
      });

      keysCollection = keyboard.querySelectorAll('.key');

      keysCollection.forEach((key) => {
        if (key.dataset.keyCode === keyCode) {
          key.classList.add('key_down');
        }
      });
    }

    if (keyCode === 'CapsLock') {
      if (isCapsLock) {
        isCapsLock = false;
      } else {
        isCapsLock = true;
      }

      if ((isShift && !isCapsLock) || (!isShift && isCapsLock)) charType = 'shift';
      if ((!isShift && !isCapsLock) || (isShift && isCapsLock)) charType = 'default';

      KEYBOARD_LAYOUT.forEach((keyboardRow, rowIndex) => {
        rowsArr[rowIndex].innerHTML = '';

        keyboardRow.forEach((code) => {
          const key = createKey(code, KeyCodesObject, lang, charType);
          rowsArr[rowIndex].append(key);
        });
      });

      keysCollection = keyboard.querySelectorAll('.key');

      keysCollection.forEach((key) => {
        if (key.dataset.keyCode === keyCode) {
          key.classList.add('key_down');
        }
      });

      keysCollection.forEach((key) => {
        if (key.dataset.keyCode === 'CapsLock') {
          if (isCapsLock) {
            key.classList.add('key_active');
          } else {
            key.classList.remove('key_active');
          }
        }
      });
    }

    console.log(keyCode, isShift, isCapsLock);
  }
}

function keyboardKeyUpHandler(e) {
  const keyCode = e.code;

  keysCollection.forEach((key) => {
    if (key.dataset.keyCode === keyCode) {
      key.classList.remove('key_down');
    }
  });

  if (keyCode === 'ShiftRight' || keyCode === 'ShiftLeft') {
    isShift = false;

    if ((isShift && !isCapsLock) || (!isShift && isCapsLock)) charType = 'shift';
    if ((!isShift && !isCapsLock) || (isShift && isCapsLock)) charType = 'default';

    KEYBOARD_LAYOUT.forEach((keyboardRow, rowIndex) => {
      rowsArr[rowIndex].innerHTML = '';

      keyboardRow.forEach((code) => {
        const key = createKey(code, KeyCodesObject, lang, charType);
        rowsArr[rowIndex].append(key);
      });
    });

    keysCollection = keyboard.querySelectorAll('.key');
  }
}

export default function createKeyboard(htmlElement) {
  textArea = htmlElement;

  keyboard = document.createElement('section');
  keyboard.classList.add(CssClasses.KEYBOARD);

  const row0 = document.createElement('div');
  row0.classList.add(CssClasses.ROW);
  keyboard.append(row0);

  const row1 = document.createElement('div');
  row1.classList.add(CssClasses.ROW);
  keyboard.append(row1);

  const row2 = document.createElement('div');
  row2.classList.add(CssClasses.ROW);
  keyboard.append(row2);

  const row3 = document.createElement('div');
  row3.classList.add(CssClasses.ROW);
  keyboard.append(row3);

  const row4 = document.createElement('div');
  row4.classList.add(CssClasses.ROW);
  keyboard.append(row4);

  rowsArr = [row0, row1, row2, row3, row4];

  KEYBOARD_LAYOUT.forEach((keyboardRow, rowIndex) => {
    keyboardRow.forEach((keyCode) => {
      const key = createKey(keyCode, KeyCodesObject, lang, charType);
      rowsArr[rowIndex].append(key);
    });
  });

  keysCollection = keyboard.querySelectorAll('.key');

  document.body.addEventListener('click', keyboardClickHandler);
  document.body.addEventListener('mousedown', keyboardMouseDownHandler);
  document.body.addEventListener('mouseup', keyboardMouseUpHandler);

  document.body.addEventListener('keyup', keyboardKeyUpHandler);
  document.body.addEventListener('keydown', keyboardKeyDownHandler);

  return keyboard;
}
