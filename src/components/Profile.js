import React,{useEffect} from 'react';
import {useSelector,useStore} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box  from '@material-ui/core/Box';
//import Chart from '../styledElement/charts';
//import  {findParts} from  '../actions/securityActions'

import styled from 'styled-components';


const useStyles = makeStyles({
  table: {
      
  },
  subWrapper:{
    border:'solid',
    borderRadius:'5%',
    width:400,
    marginTop :10,
  },
  container:{
    OverflowY:'scroll',
    height:100
  },
  wrapper:{
    maxWidth: 400,
    maxHeight:500,
    margin:'0 auto',
    marginTop:10,
    OverflowY:'scroll',
  },
});

function Profile() {
    const classes = useStyles();
    const store=useStore();
    //const parts =useSelector(state=>state.parts);
    const fullName =useSelector(state=>state.security.user.fullName);
    useEffect(()=>{
      //store.dispatch(findParts());
    });

    return (
        <Box className={classes.wrapper} >
            <h3>Mr.{fullName}</h3>
            {/*<div>Total parts :  {parts.length}</div>
            <Box className={classes.subWrapper} p={1}>
                <b>Table rpresenting scores of parts played in a specific date </b>
            <TableContainer className={classes.container}component={Paper}>
            <Table className={classes.table}  size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell>score (/3)</TableCell>
                    <TableCell align="right">Date</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {parts.map((row) => (
                    <TableRow  key={row.id}>
                    <TableCell >{row.score}</TableCell>
                    <TableCell align="right">{row.created_At}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            </Box>
            <Box  className={classes.subWrapper} p={1}>
                <b>The chart bellow shows your evolution in time </b>
                <Chart parts={parts}/>
            </Box>
                */}
        </Box>
);





        
}

export default Profile;