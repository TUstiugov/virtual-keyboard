import './keyboard.scss';

import createKey from '../key/key';
import getKeyCodes from '../../db/keys';

const CssClasses = {
  KEYBOARD: 'keyboard',
  ROW: 'keyboard__row',
};

const KEYBOARD_LAYOUT = [
  [192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8],
  [9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 46],
  [20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 13],
  [16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 38, 16],
  [17, 91, 18, 32, 18, 37, 40, 39, 17],
];

const KeyCodesObject = getKeyCodes();

const lang = 'en';

export default function createKeyboard() {
  const keyboard = document.createElement('section');
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

  const rowsArr = [row0, row1, row2, row3, row4];

  KEYBOARD_LAYOUT.forEach((keyboardRow, rowIndex) => {
    keyboardRow.forEach((keyCode) => {
      const key = createKey(keyCode, KeyCodesObject, lang);
      rowsArr[rowIndex].append(key);
    });
  });

  return keyboard;
}
