import React, {useContext, useMemo} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import invariant from 'tiny-invariant';
import {createStyles, makeStyles} from '@material-ui/core/styles';

import type {AutocompleteProps, AutocompleteRenderInputParams} from '@material-ui/lab/Autocomplete';
import type {FC} from 'react';
import type {Direction, RoomDefinition, RoomExitDefinition} from '@adamantiamud/core';
import type {Theme} from '@material-ui/core';

import {ControlPanelContext} from '~/components/control-panel/context-provider';
import {ExitDirection} from '~/interfaces';
import {cast} from '~/utils/fns';

import type {AreaCtx, RoomNode} from '~/interfaces';

interface ComponentProps {
    direction: ExitDirection;
    room: RoomNode;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
    },
    roomSelect: {
        flexGrow: 1,
    },
    dirSelect: {
        marginLeft: theme.spacing(2),
        minWidth: '6rem',
    },
}));

export const RoomExitDetails: FC<ComponentProps> = ({direction, room}: ComponentProps) => {
    const areaCtx = useContext<AreaCtx | null>(ControlPanelContext);

    invariant(areaCtx, 'This component must be used in the Control Panel');

    const {rooms, updateRoom} = areaCtx;

    const classes = useStyles();

    const {roomDef} = room;

    const roomOptions = useMemo<RoomDefinition[]>(
        () => rooms.reduce(
            (acc: RoomDefinition[], node: RoomNode) => [...acc, node.roomDef],
            []
        ),
        [rooms]
    );

    const roomExit = useMemo<RoomExitDefinition | null>(
        () => roomDef.exits?.find((exit: RoomExitDefinition) => exit.direction === cast<Direction>(direction)) ?? null,
        [direction, roomDef.exits]
    );

    const exitRoom = useMemo<RoomDefinition | undefined>(
        () => {
            if (roomExit === null) {
                return undefined;
            }

            const foundRoom = rooms.find((node: RoomNode) => node.roomDef.id === roomExit.roomId);

            return foundRoom?.roomDef;
        },
        [roomExit, rooms]
    );

    const exitRoomDirection = useMemo<ExitDirection | undefined>(
        () => {
            if (exitRoom === undefined) {
                return undefined;
            }

            const foundExit = exitRoom.exits?.find((exit: RoomExitDefinition) => exit.roomId === roomDef.id);

            return cast<ExitDirection>(foundExit?.direction);
        },
        [exitRoom, roomDef]
    );

    if (roomExit === null) {
        return null;
    }

    const roomSelectProps: AutocompleteProps<RoomDefinition, false, true, false> = {
        id: '',
        options: roomOptions,
        getOptionLabel: (option: RoomDefinition) => option.title,
        /* eslint-disable-next-line react/no-multi-comp */
        renderInput: (params: AutocompleteRenderInputParams) => (
            <TextField {...params} size="small" variant="standard" />
        ),
        value: exitRoom,
        className: classes.roomSelect,
        disableClearable: true,
        size: 'small',
    };

    const dirSelectProps: AutocompleteProps<ExitDirection, false, true, false> = {
        id: '',
        options: [
            ExitDirection.NORTH,
            ExitDirection.EAST,
            ExitDirection.SOUTH,
            ExitDirection.WEST,
        ],
        getOptionLabel: (option: ExitDirection) => `${option[0].toUpperCase()}${option.slice(1)}`,
        /* eslint-disable-next-line react/no-multi-comp */
        renderInput: (params: AutocompleteRenderInputParams) => (
            <TextField {...params} size="small" variant="standard" />
        ),
        value: exitRoomDirection,
        className: classes.dirSelect,
        disableClearable: true,
        size: 'small',
    };

    return (
        <div className={classes.root}>
            <Autocomplete {...roomSelectProps} />
            <Autocomplete {...dirSelectProps} />
        </div>
    );
};

export default RoomExitDetails;
