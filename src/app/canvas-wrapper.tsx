import React from 'react';

import type {FC} from 'react';

import AreaCanvas from '~/components/area-canvas';
import AreaContextProvider from '~/area-context-provider';

export const CanvasWrapper: FC = () => (
    <AreaContextProvider>
        <AreaCanvas />
    </AreaContextProvider>
);

export default CanvasWrapper;
