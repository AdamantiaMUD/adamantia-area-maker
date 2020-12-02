import React, {useCallback, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import type {FC} from 'react';

import type {AreaCtx} from '~/interfaces';

const useStyles = makeStyles({
    btnWrapper: {
        display: 'flex',
        justifyContent: 'end',
    },
});

interface ComponentProps {
    areaCtx: AreaCtx;
}

export const DeleteRoomButton: FC<ComponentProps> = ({areaCtx}: ComponentProps) => {
    const {
        removeRoom,
        selectedId,
    } = areaCtx;

    const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

    const classes = useStyles();

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
            <div className={classes.btnWrapper}>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={(<DeleteIcon />)}
                    onClick={openDialog}
                    size="small"
                >
                    Delete Room
                </Button>
            </div>

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
