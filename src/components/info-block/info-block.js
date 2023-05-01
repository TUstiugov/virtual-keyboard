import './info-block.scss';

const CssClasses = {
  INFO_BLOCK: 'info-block',
};

const infoText = 'Клавиатура создана в операционной системе Windows.\n Для переключения языка комбинация: левыe ctrl + левый alt.';

export default function createInfoBlock() {
  const infoBlock = document.createElement('p');
  infoBlock.classList.add(CssClasses.INFO_BLOCK);
  infoBlock.innerText = infoText;

  return infoBlock;
}
