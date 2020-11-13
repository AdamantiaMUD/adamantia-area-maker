/* global module */
import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';

ReactDOM.render((<App />), document.getElementById('root'));

if (typeof module.hot !== 'undefined') {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
    module.hot.accept();
}
