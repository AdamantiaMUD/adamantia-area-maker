import React, {useCallback, useContext, useState} from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import invariant from 'tiny-invariant';

import type {FC} from 'react';

import {ControlPanelContext} from '~/components/control-panel/context-provider';

import type {AreaCtx} from '~/interfaces';

export const DeleteRoomButton: FC = () => {
    const areaCtx = useContext<AreaCtx | null>(ControlPanelContext);

    invariant(areaCtx, 'This component must be used in the Control Panel');

    const {removeRoom, selectedId} = areaCtx;

    const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

    const closeDialog = useCallback(
        () => setDialogOpen(false),
        [setDialogOpen]
    );

    const openDialog = useCallback(
        () => setDialogOpen(true),
        [setDialogOpen]
    );

    const handleDelete = useCallback(
        () => {
            if (selectedId !== '') {
                removeRoom(selectedId);
            }
        },
        [removeRoom, selectedId]
    );

    return (
        <React.Fragment>
            <Button
                variant="contained"
                color="secondary"
                startIcon={(<DeleteIcon />)}
                onClick={openDialog}
                size="small"
            >
                Delete Room
            </Button>

            <Dialog
                open={isDialogOpen}
                onClose={closeDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Are you sure?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this room? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="primary">Never mind</Button>
                    <Button onClick={handleDelete} color="primary">Delete it!</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default DeleteRoomButton;
