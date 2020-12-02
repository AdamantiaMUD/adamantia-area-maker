import React, {useCallback, useMemo} from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {useDebounce} from 'use-debounce';

import type {FC} from 'react';
import type {Theme} from '@material-ui/core';

import DeleteRoomButton from '~/components/rooms/delete-room-button';
import RoomInfo from '~/components/rooms/room-info';

import {DEBOUNCE_DELAY_SLOW, GRID_SIZE} from '~/constants';

import type {AreaCtx, Position, RoomNode} from '~/interfaces';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '32rem',
        position: 'absolute',
        right: '1rem',
        top: '1rem',
    },
    divider: {
        marginTop: '1rem',
    },
    areaName: {
        marginBottom: theme.spacing(1),
    },
    foo: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}));

interface ComponentProps {
    areaCtx: AreaCtx;
    stageCoords: Position;
}

export const ControlPanel: FC<ComponentProps> = ({areaCtx, stageCoords}: ComponentProps) => {
    const [coords] = useDebounce(stageCoords, DEBOUNCE_DELAY_SLOW);

    const {addRoom, rooms, selectedId} = areaCtx;

    const add = useCallback(
        () => {
            const x = -1 * (coords.x - (2 * GRID_SIZE));
            const y = -1 * (coords.y - (2 * GRID_SIZE));

            addRoom({x, y});
        },
        [addRoom, coords]
    );

    const classes = useStyles();

    const selectedRoom = useMemo<RoomNode | null>(
        () => {
            if (selectedId === '') {
                return null;
            }

            return rooms.find((room: RoomNode): boolean => room.id === selectedId) ?? null;
        },
        [rooms, selectedId]
    );

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h1" gutterBottom>
                    AdamantiaMUD Area Maker
                </Typography>
                <hr className={classes.divider} />
                <Typography variant="h6" component="h3" gutterBottom>
                    Area
                </Typography>
                <TextField
                    fullWidth
                    className={classes.areaName}
                    label="Name"
                    size="small"
                />
                <div className={classes.foo}>
                    <Typography>{`Rooms: ${rooms.length}`}</Typography>
                    <Button variant="outlined" onClick={add} size="small">
                        Add Room
                    </Button>
                </div>
                {selectedRoom !== null && (
                    <React.Fragment>
                        <hr className={classes.divider} />
                        <Typography variant="h6" component="h3" gutterBottom>
                            Selected Room
                        </Typography>
                        <RoomInfo room={selectedRoom} />
                        <DeleteRoomButton areaCtx={areaCtx} />
                    </React.Fragment>
                )}
            </CardContent>
        </Card>
    );
};

export default ControlPanel;
