import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {createStyles, makeStyles} from '@material-ui/core/styles';

import type {FC} from 'react';

import AddRemoveExitButton from '~/components/control-panel/exits/add-remove-exit-button';

import type {RoomNode} from '~/interfaces';

interface ComponentProps {
    room: RoomNode;
}

const useStyles = makeStyles(() => createStyles({
    root: {
        marginTop: 0,
        paddingTop: 0,
    },
}));

export const RoomExitList: FC<ComponentProps> = ({room}: ComponentProps) => {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            <ListItem>
                <ListItemText
                    primary="North"
                    secondary=""
                />
                <AddRemoveExitButton direction="north" room={room} />
            </ListItem>
            <ListItem>
                <ListItemText
                    primary="East"
                    secondary=""
                />
                <AddRemoveExitButton direction="east" room={room} />
            </ListItem>
            <ListItem>
                <ListItemText
                    primary="South"
                    secondary=""
                />
                <AddRemoveExitButton direction="south" room={room} />
            </ListItem>
            <ListItem>
                <ListItemText
                    primary="West"
                    secondary=""
                />
                <AddRemoveExitButton direction="west" room={room} />
            </ListItem>
        </List>
    );
};

export default RoomExitList;
