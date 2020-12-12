import React, {useMemo} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import produce from 'immer';
import {useRecoilValue} from 'recoil';

import type {AutocompleteProps, AutocompleteRenderInputParams} from '@material-ui/lab/Autocomplete';
import type {FC, SyntheticEvent} from 'react';
import type {Direction, RoomDefinition, RoomExitDefinition} from '@adamantiamud/core';
import type {Draft} from 'immer';
import type {Theme, Value} from '@material-ui/core';

import useUpdateRoom from '~/hooks/use-update-room';
import {cast} from '~/utils/fns';
import {roomsList} from '~/state/rooms-state';

import type {ExitDirection, RoomNode} from '~/interfaces';

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
    const rooms = useRecoilValue(roomsList);
    const updateRoom = useUpdateRoom();

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
        onChange: (event: SyntheticEvent, newValue: Value<RoomDefinition, false, true, false>) => {
            const foundExitIdx = roomDef.exits!
                .findIndex((exit: RoomExitDefinition) => exit.direction === cast<Direction>(direction));

            if (foundExitIdx > -1) {
                updateRoom(produce(room, (draft: Draft<RoomNode>) => {
                    draft.roomDef.exits![foundExitIdx].roomId = newValue.id;
                }));
            }
        },
    };

    return (<Autocomplete {...roomSelectProps} />);
};

export default RoomExitDetails;
