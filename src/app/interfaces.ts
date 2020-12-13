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

export type AddRoomFunc = (coords: Position) => void;
export type RemoveRoomFunc = (roomId: string) => void;
export type UpdateRoomFunc = (room: RoomNode) => void;
