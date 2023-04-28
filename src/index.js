import createHeader from './components/header/header';
import createFooter from './components/footer/footer';

import './index.scss';

const header = createHeader('Virtual Keyboard');
const footer = createFooter();

document.body.append(header);
document.body.append(footer);
