import Typography from '@material-ui/core/Typography';
import React, {useContext} from 'react';
import TextField from '@material-ui/core/TextField';
import {createStyles, makeStyles} from '@material-ui/core/styles';

import type {FC} from 'react';
import type {Theme} from '@material-ui/core';
import invariant from 'tiny-invariant';
import {ControlPanelContext} from '~/components/control-panel/context-provider';

import RoomExits from '~/components/rooms/room-exits';

import type {AreaCtx, RoomNode} from '~/interfaces';

interface ComponentProps {
    room: RoomNode;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        '& > *': {
            marginBottom: theme.spacing(2),
        },
    },
}));

export const RoomInfo: FC<ComponentProps> = ({room}: ComponentProps) => {
    const areaCtx = useContext<AreaCtx | null>(ControlPanelContext);

    invariant(areaCtx, 'This component must be used in the Control Panel');

    const {rooms} = areaCtx;

    const classes = useStyles();

    const {roomDef} = room;

    return (
        <div className={classes.root}>
            <TextField
                disabled
                fullWidth
                label="ID"
                value={room.id}
                size="small"
            />
            <TextField
                fullWidth
                label="Title"
                value={roomDef.title}
                size="small"
            />
            <TextField
                fullWidth
                multiline
                label="Description"
                rows={4}
                value={roomDef.description}
                variant="outlined"
                size="small"
            />
            {rooms.length > 1 && (
                <React.Fragment>
                    <Typography variant="h6" component="h3" gutterBottom>
                        Exits
                    </Typography>
                    <RoomExits room={room} />
                </React.Fragment>
            )}
        </div>
    );
};

export default RoomInfo;
