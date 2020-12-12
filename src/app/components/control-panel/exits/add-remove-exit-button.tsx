import React, {useCallback, useMemo} from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import produce from 'immer';

import type {Draft} from 'immer';
import type {FC} from 'react';
import type {Direction, RoomExitDefinition} from '@adamantiamud/core';

import useUpdateRoom from '~/hooks/use-update-room';
import {cast} from '~/utils/fns';

import type {ExitDirection, RoomNode} from '~/interfaces';

interface ComponentProps {
    direction: ExitDirection;
    room: RoomNode;
}

export const AddRemoveExitButton: FC<ComponentProps> = ({direction, room}: ComponentProps) => {
    const {roomDef} = room;

    const updateRoom = useUpdateRoom();

    const roomExit = useMemo<RoomExitDefinition | null>(
        () => roomDef.exits?.find((exit: RoomExitDefinition) => exit.direction === cast<Direction>(direction)) ?? null,
        [direction, roomDef.exits]
    );

    const addExit = useCallback(
        (): void => updateRoom(produce(room, (draft: Draft<RoomNode>) => {
            draft.roomDef.exits = draft.roomDef.exits ?? [];

            draft.roomDef.exits.push({
                direction: cast<Direction>(direction),
                roomId: draft.roomDef.id,
            });
        })),
        [
            direction,
            room,
            updateRoom,
        ]
    );

    const removeExit = useCallback(
        (): void => updateRoom(produce(room, (draft: Draft<RoomNode>) => {
            draft.roomDef.exits = (draft.roomDef.exits ?? [])
                .filter((exit: RoomExitDefinition): boolean => exit.direction !== cast<Direction>(direction));
        })),
        [
            direction,
            room,
            updateRoom,
        ]
    );

    return (
        <ListItemIcon>
            {roomExit === null && (
                <IconButton edge="end" aria-label="add" onClick={addExit}>
                    <AddCircleIcon />
                </IconButton>
            )}
            {roomExit !== null && (
                <IconButton edge="end" aria-label="delete" onClick={removeExit}>
                    <DeleteIcon />
                </IconButton>
            )}
        </ListItemIcon>
    );
};

export default AddRemoveExitButton;
