import { initialLang } from './components/lang/lang';
import createHeader from './components/header/header';
import createMain from './components/main/main';
import createFooter from './components/footer/footer';

import './index.scss';

initialLang();

const HEADER_TITLE = 'Virtual Keyboard';

const header = createHeader(HEADER_TITLE);
const main = createMain();
const footer = createFooter();

document.body.append(header);
document.body.append(main);
document.body.append(footer);
