import React from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';

import type {FC} from 'react';
import type {Theme} from '@material-ui/core';

import type {RoomNode} from '~/interfaces';

interface ComponentProps {
    room: RoomNode;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        '& > *': {
            marginBottom: theme.spacing(2),
        },
    },
}));

export const RoomInfo: FC<ComponentProps> = ({room}: ComponentProps) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TextField
                disabled
                fullWidth
                label="ID"
                value={room.id}
            />
            <TextField
                fullWidth
                label="Title"
                value={room.roomDef.title}
            />
            <TextField
                fullWidth
                multiline
                label="Description"
                rows={4}
                value={room.roomDef.description}
                variant="outlined"
            />
        </div>
    );
};

export default RoomInfo;
