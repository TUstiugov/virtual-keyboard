import './footer.scss';

const CssClasses = {
  FOOTER: 'footer',
  CONTAINER: 'container',
  CONTENT: 'footer__content',
  LINK: 'footer__link',
  COPYRIGHT: 'footer__copyright',
};

export default function createFooter() {
  const footer = document.createElement('footer');
  footer.classList.add(CssClasses.FOOTER);

  const container = document.createElement('div');
  container.classList.add(CssClasses.CONTAINER);

  const content = document.createElement('section');
  content.classList.add(CssClasses.CONTENT);

  const link = document.createElement('a');
  link.classList.add(CssClasses.LINK);
  link.innerText = 'T. Ustiugov';
  link.href = 'https://github.com/TUstiugov';
  link.target = '_blank';
  content.append(link);

  const copyright = document.createElement('p');
  copyright.classList.add(CssClasses.COPYRIGHT);
  copyright.innerText = '© 2023';
  content.append(copyright);

  container.append(content);
  footer.append(container);

  return footer;
}
