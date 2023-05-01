import './header.scss';

const CssClasses = {
  HEADER: 'header',
  CONTAINER: 'container',
  TITLE: 'header__title',
};

export default function createHeader(text) {
  const header = document.createElement('header');
  header.classList.add(CssClasses.HEADER);

  const container = document.createElement('div');
  container.classList.add(CssClasses.CONTAINER);

  const title = document.createElement('h1');
  title.classList.add(CssClasses.TITLE);
  title.innerText = text;

  container.append(title);
  header.append(container);

  return header;
}
