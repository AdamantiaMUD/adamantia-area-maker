import {atom, selector} from 'recoil';

import type {GetRecoilValue} from 'recoil';

import type {RoomNode} from '~/interfaces';

export const selectedRoomState = atom<string>({
    'key': 'selectedId',
    'default': '',
});

export const roomsState = atom<{[key: string]: RoomNode}>({
    'key': 'rooms',
    'default': {},
});

export const roomsList = selector<RoomNode[]>({
    key: 'roomsList',
    get: ({get}: {get: GetRecoilValue}): RoomNode[] => {
        const rooms = get(roomsState);

        return Object.values(rooms);
    },
});

export default roomsState;
