import React from 'react';

import type {FC, PropsWithChildren as PWC} from 'react';

import type {AreaCtx} from '~/interfaces';

interface ComponentProps {
    areaCtx: AreaCtx;
}

export const ControlPanelContext = React.createContext<AreaCtx | null>(null);

export const ControlPanelContextProvider: FC<ComponentProps> = ({areaCtx, children}: PWC<ComponentProps>) => (
    <ControlPanelContext.Provider value={areaCtx}>
        {children}
    </ControlPanelContext.Provider>
);

export default ControlPanelContextProvider;
