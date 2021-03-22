import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    control: {
        padding: theme.spacing(2),
    },
    paper: {
        marginTop: 20,
        marginRight: 20,
        marginBottom: 20,
        width: 120,
        height: 130,
        padding: 10,
        display: 'block',
        justifyContent:'center',
        textAlign:'center',
        boxShadow:' 0px 0px 5px 1px'
        //backgroundColor:'lightgray'
    }
    ,
    availabel: {
        color: 'rgb(74,184,49)',
        fontWeight: 'bold',
        fontSize: '14',
    },
    unavailabel: {
        color:'rgb(184,49,49)',
        fontWeight: 'bold',
        fontSize: '14'
    },
    type:{
        fontWeight:'bold'
    }
}));

export default function Key() {
    const classes = useStyles();
    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    <Grid key={1} spacing={2} >
                        <Paper className={classes.paper}>
                            <div className={classes.availabel}>متوفر</div>
                            <img src='/setGreen.png' style={{ marginTop:10,marginBottom:10}}width={40} height={40} alt="" />
                            <div className={classes.type}>مقعد </div>
                        </Paper>
                    </Grid>
                    <Grid key={2} spacing={2} >
                        <Paper className={classes.paper}>
                            <div className={classes.unavailabel}>غير متوفر</div>
                            <img src='/setRed.png' style={{ marginTop:10,marginBottom:10}} width={40} height={40} alt=""/>
                            <div className={classes.type}>مقعد </div>

                        </Paper>
                    </Grid>
                    <Grid key={3} spacing={2} >
                        <Paper className={classes.paper}>
                            <div className={classes.availabel}>متوفر</div>
                            <img src='/parckGreen.png' width={80} height={60}alt="" />
                            <div className={classes.type}>موقف </div>
                        </Paper>
                    </Grid>
                    <Grid key={4} spacing={2} >
                        <Paper className={classes.paper}>
                           <div className={classes.unavailabel}>غير متوفر</div>
                            <img src='/parckRed.png' width={80} height={60} alt=""/>
                           <div className={classes.type}>موقف </div>
                        </Paper>
                    </Grid>

                </Grid>
            </Grid>
        </Grid>
    );
}