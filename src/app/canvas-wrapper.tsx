import React, {useCallback, useState} from 'react';
import {v4 as uuid} from 'uuid';

import type {FC} from 'react';

import AreaCanvas from '~/components/area-canvas';
import {getSnappedCoords} from '~/utils/grid';

import type {AreaCtx, Position, RoomNode} from '~/interfaces';

export const CanvasWrapper: FC = () => {
    const [rooms, setRooms] = useState<RoomNode[]>([]);
    const [selectedId, setSelectedId] = useState<string>('');

    const addRoom = useCallback(
        (coords: Position): void => {
            setRooms((prev: RoomNode[]): RoomNode[] => [
                ...prev,
                {
                    id: uuid(),
                    color: '#666',
                    coords: getSnappedCoords(coords),
                    roomDef: {
                        id: '',
                        title: 'New Room',
                        description: '',
                    },
                    lastUpdate: Date.now(),
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

    const updateRoom = useCallback(
        (room: RoomNode) => setRooms((prev: RoomNode[]): RoomNode[] => {
            const roomArr: RoomNode[] = [];

            for (const node of prev) {
                if (node.id === room.id) {
                    roomArr.push({...room, lastUpdate: Date.now()});
                }
                else {
                    roomArr.push(node);
                }
            }

            return roomArr;
        }),
        [setRooms]
    );

    const ctx: AreaCtx = {
        addRoom,
        removeRoom,
        rooms,
        selectedId,
        setSelectedId,
        updateRoom,
    };

    return (<AreaCanvas areaCtx={ctx} />);
};

export default CanvasWrapper;
