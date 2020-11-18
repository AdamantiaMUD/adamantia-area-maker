import React from 'react';
import Typography from '@material-ui/core/Typography';

import type {FC} from 'react';

import type {RoomNode} from '~/interfaces';

interface ComponentProps {
    room: RoomNode;
}

export const RoomInfo: FC<ComponentProps> = ({room}: ComponentProps) => (
    <React.Fragment>
        <Typography>
            {'ID: '}
            {room.id}
        </Typography>
        <Typography>
            {'Title: '}
            {room.roomDef.title}
        </Typography>
        <Typography>
            {'Desc: '}
            {room.roomDef.description}
        </Typography>
    </React.Fragment>
);

export default RoomInfo;
