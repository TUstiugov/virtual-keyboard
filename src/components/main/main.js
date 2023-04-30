import './main.scss';

import createTextArea from '../text-area/text-area';
import createKeyboard from '../keyboard/keyboard';

const CssClasses = {
  MAIN: 'main',
  CONTAINER: 'container',
};

export default function createMain() {
  const main = document.createElement('main');
  main.classList.add(CssClasses.MAIN);

  const container = document.createElement('div');
  container.classList.add(CssClasses.CONTAINER);

  const textArea = createTextArea();
  container.append(textArea);

  const keyboard = createKeyboard(textArea);
  container.append(keyboard);

  main.append(container);

  return main;
}
