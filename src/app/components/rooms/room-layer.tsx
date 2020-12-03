import React from 'react';
import {Layer} from 'react-konva';

import type {FC} from 'react';

import Room from '~/components/rooms/room';

import type {AreaCtx, RoomNode} from '~/interfaces';

interface ComponentProps {
    areaCtx: AreaCtx;
}

export const RoomLayer: FC<ComponentProps> = ({areaCtx}: ComponentProps) => {
    const {
        rooms,
        selectedId,
        setSelectedId,
        updateRoom,
    } = areaCtx;

    return (
        <Layer>
            {rooms.map((room: RoomNode) => (
                <Room
                    key={`${room.id}.${room.lastUpdate}`}
                    isSelected={selectedId === room.id}
                    node={room}
                    selectRoom={setSelectedId}
                    updateRoom={updateRoom}
                />
            ))}
        </Layer>
    );
};

export default RoomLayer;
