import type {RoomDefinition} from '@adamantiamud/core';

export enum ExitDirection {
    NORTH = 'north',
    EAST = 'east',
    SOUTH = 'south',
    WEST = 'west',
}

export interface Position {
    x: number;
    y: number;
}

export interface RoomNode {
    id: string;
    roomDef: RoomDefinition;
    color: string;
    coords: Position;
    lastUpdate: number;
}

export interface AreaCtx {
    addRoom: (coords: Position) => void;
    removeRoom: (roomId: string) => void;
    rooms: RoomNode[];
    selectedId: string;
    setSelectedId: (id: string) => void;
    updateRoom: (room: RoomNode) => void;
}
