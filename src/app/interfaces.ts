import type {RoomDefinition} from '@adamantiamud/core';

export interface Position {
    x: number;
    y: number;
}

export interface AreaCtx {
    addRoom: () => void;
    removeRoom: (roomId: string) => void;
    rooms: RoomNode[];
    selectedId: string;
    setSelectedId: (id: string) => void;
}

export interface RoomNode {
    id: string;
    roomDef: RoomDefinition;
    color: string;
    coords: Position;
}
