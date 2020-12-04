import React, {useCallback, useContext, useMemo} from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import invariant from 'tiny-invariant';
import produce from 'immer';

import type {Draft} from 'immer';
import type {FC} from 'react';
import type {RoomExitDefinition} from '@adamantiamud/core';

import {ControlPanelContext} from '~/components/control-panel/context-provider';

import type {AreaCtx, RoomNode} from '~/interfaces';

interface ComponentProps {
    direction: 'north' | 'east' | 'south' | 'west';
    room: RoomNode;
}

export const AddRemoveExitButton: FC<ComponentProps> = ({direction, room}: ComponentProps) => {
    const areaCtx = useContext<AreaCtx | null>(ControlPanelContext);

    invariant(areaCtx, 'This component must be used in the Control Panel');

    const {updateRoom} = areaCtx;

    const {roomDef} = room;

    const roomExit = useMemo<RoomExitDefinition | null>(
        () => roomDef.exits?.find((exit: RoomExitDefinition) => exit.direction === direction) ?? null,
        [direction, roomDef.exits]
    );

    const addExit = useCallback(
        (): void => updateRoom(produce(room, (draft: Draft<RoomNode>) => {
            draft.roomDef.exits = draft.roomDef.exits ?? [];

            draft.roomDef.exits.push({
                direction: direction,
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
                .filter((exit: RoomExitDefinition): boolean => exit.direction !== direction);
        })),
        [
            direction,
            room,
            updateRoom,
        ]
    );

    return (
        <ListItemSecondaryAction>
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
        </ListItemSecondaryAction>
    );
};

export default AddRemoveExitButton;
