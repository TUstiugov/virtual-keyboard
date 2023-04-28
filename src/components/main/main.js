import './main.scss';

const CssClasses = {
  MAIN: 'main',
  CONTAINER: 'container',
};

export default function createMain() {
  const main = document.createElement('main');
  main.classList.add(CssClasses.MAIN);

  const container = document.createElement('div');
  container.classList.add(CssClasses.CONTAINER);

  return main;
}
