import React, {useCallback, useState} from 'react';
import {v4 as uuid} from 'uuid';

import type {FC, PropsWithChildren as PWC} from 'react';

import type {AreaCtx, RoomNode} from '~/interfaces';

/* eslint-disable @typescript-eslint/no-empty-function */
export const AreaContext = React.createContext<AreaCtx>({
    addRoom: () => {},
    removeRoom: () => {},
    rooms: [],
    selectedId: '',
    setSelectedId: () => {},
});
/* eslint-enable @typescript-eslint/no-empty-function */

/* eslint-disable-next-line @typescript-eslint/ban-types */
export const AreaContextProvider: FC = ({children}: PWC<{}>) => {
    const [rooms, setRooms] = useState<RoomNode[]>([]);
    const [selectedId, setSelectedId] = useState<string>('');

    const addRoom = useCallback(
        (): void => {
            setRooms((prev: RoomNode[]): RoomNode[] => [
                ...prev,
                {
                    id: uuid(),
                    color: '#f00',
                    coords: {x: 0, y: 0},
                    roomDef: {
                        id: '',
                        title: 'New Room',
                        description: '',
                    },
                },
            ]);
        },
        [setRooms]
    );

    const removeRoom = useCallback(
        (roomId: string): void => {
            setRooms((prev: RoomNode[]): RoomNode[] => {
                const filterFunc = (room: RoomNode): boolean => room.id !== roomId;

                return prev.filter(filterFunc);
            });
        },
        [setRooms]
    );

    const ctx: AreaCtx = {
        addRoom,
        removeRoom,
        rooms,
        selectedId,
        setSelectedId,
    };

    return (
        <AreaContext.Provider value={ctx}>
            {children}
        </AreaContext.Provider>
    );
};

export default AreaContextProvider;
