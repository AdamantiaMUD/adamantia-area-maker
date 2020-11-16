import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import type {FC} from 'react';

import {AreaContext} from '~/area-context-provider';

const useStyles = makeStyles({
    root: {
        width: '32rem',
        position: 'absolute',
        right: '1rem',
        top: '1rem',
    },
});

export const ControlPanel: FC = () => {
    const classes = useStyles();

    const {addRoom} = useContext(AreaContext);

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h1" gutterBottom>
                    AdamantiaMUD Area Maker
                </Typography>
                <Button variant="contained" onClick={addRoom}>
                    Add Room
                </Button>
            </CardContent>
        </Card>
    );
};

export default ControlPanel;
