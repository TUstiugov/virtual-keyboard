import './key.scss';

const CssClasses = {
  KEY: 'key',
  SYSTEM_KEY: 'key_system',
  CHAR_KEY: 'key_char',
  SPACE: 'key_space',
};

export default function createKey(keyCode, KeyCodesObject, lang, type) {
  const keyObject = KeyCodesObject[keyCode];

  const key = document.createElement('button');
  key.classList.add(CssClasses.KEY);
  key.classList.add(`${CssClasses.KEY}__${keyCode}`);
  key.dataset.keyCode = keyCode;

  if (keyObject.isSystem) {
    key.classList.add(CssClasses.SYSTEM_KEY);
  } else {
    key.classList.add(CssClasses.CHAR_KEY);
  }

  key.textContent = keyObject.value[lang][type];

  if (keyObject.keyName === 'space') {
    key.classList.add(CssClasses.SPACE);
  }

  return key;
}
