import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {createStyles, makeStyles} from '@material-ui/core/styles';

import type {FC} from 'react';

import AddRemoveExitButton from '~/components/control-panel/exits/add-remove-exit-button';
import RoomExitDetails from '~/components/control-panel/exits/room-exit-details';
import {ExitDirection} from '~/interfaces';

import type {RoomNode} from '~/interfaces';

interface ComponentProps {
    room: RoomNode;
}

const useStyles = makeStyles(() => createStyles({
    root: {
        marginBottom: 0,
        marginTop: 0,
        paddingBottom: 0,
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
                    secondary={(<RoomExitDetails direction={ExitDirection.NORTH} room={room} />)}
                />
                <AddRemoveExitButton direction={ExitDirection.NORTH} room={room} />
            </ListItem>
            <ListItem>
                <ListItemText
                    primary="East"
                    secondary={(<RoomExitDetails direction={ExitDirection.EAST} room={room} />)}
                />
                <AddRemoveExitButton direction={ExitDirection.EAST} room={room} />
            </ListItem>
            <ListItem>
                <ListItemText
                    primary="South"
                    secondary={(<RoomExitDetails direction={ExitDirection.SOUTH} room={room} />)}
                />
                <AddRemoveExitButton direction={ExitDirection.SOUTH} room={room} />
            </ListItem>
            <ListItem>
                <ListItemText
                    primary="West"
                    secondary={(<RoomExitDetails direction={ExitDirection.WEST} room={room} />)}
                />
                <AddRemoveExitButton direction={ExitDirection.WEST} room={room} />
            </ListItem>
        </List>
    );
};

export default RoomExitList;
