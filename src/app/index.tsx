/* global module */
import React from 'react';
import ReactDOM from 'react-dom';

import CanvasWrapper from '~/canvas-wrapper';

ReactDOM.render((<CanvasWrapper />), document.getElementById('root'));

if (typeof module.hot !== 'undefined') {
    module.hot.accept();
}
