function initialLang() {
  if (!localStorage.getItem('lang')) {
    localStorage.setItem('lang', 'en');
  }
}

function getLang() {
  return localStorage.getItem('lang');
}

function setLang(lang) {
  localStorage.setItem('lang', lang);
}

export { initialLang, getLang, setLang };
