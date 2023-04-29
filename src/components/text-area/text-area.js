import './text-area.scss';

const CssClasses = {
  TEXT_AREA: 'text-area',
};

export default function createTextArea() {
  const textArea = document.createElement('textarea');
  textArea.classList.add(CssClasses.TEXT_AREA);
  textArea.rows = '10';
  textArea.autofocus = true;

  textArea.addEventListener('blur', () => textArea.focus());

  return textArea;
}
