import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
    paper: {
        marginTop: 20,
        marginRight: 20,
        marginBottom: 20,
        width: 120,
        height: 100,
        padding: 10,
        display: 'block',
        justifyContent:'center'
    }
    ,
    availabel: {
        color: 'green',
        fontWeight: 'bold',
        fontSize: '12'
    },
    unavailabel: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: '12'
    },
}));

export default function Key() {
    const classes = useStyles();
    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    <Grid key={1} spacing={2} >
                        <Paper className={classes.paper}>
                            <img src='/seat.svg' width={40} height={40} />
                            <div>seat</div>
                        </Paper>
                    </Grid>
                    <Grid key={2} spacing={2} >
                        <Paper className={classes.paper}>
                            <img src='/seat.svg' width={40} height={40} />
                            <div>park </div>
                        </Paper>
                    </Grid>
                    <Grid key={1} spacing={2} >
                        <Paper className={classes.paper}>
                            <img src='/seat.svg' width={40} height={40} />
                            <div className={classes.availabel}>available</div>
                        </Paper>
                    </Grid>
                    <Grid key={2} spacing={2} >
                        <Paper className={classes.paper}>
                            <img src='/seat.svg' width={40} height={40} />
                            <div className={classes.unavailabel}>unavailable </div>
                        </Paper>
                    </Grid>
                    <Grid key={3} spacing={2} >
                        <Paper className={classes.paper}>
                            <img src='/seat.svg' width={40} height={40} />
                            <div className={classes.availabel}>available</div>
                        </Paper>
                    </Grid>
                    <Grid key={4} spacing={2} >
                        <Paper className={classes.paper}>
                            <img src='/seat.svg' width={40} height={40} />
                            <div className={classes.unavailabel}>unavailable </div>
                        </Paper>
                    </Grid>

                </Grid>
            </Grid>
        </Grid>
    );
}