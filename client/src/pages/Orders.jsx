import { useState } from "react";
import { Link } from "react-router-dom";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import API_BASE_URL from "./config";
import { Grid, Typography } from "@mui/material";

const Orders = () =>{
const [orders, setOrders] =useState([]);
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


React.useEffect(()=>{
   (async()=>{
    try {
      const emailId = sessionStorage.getItem('userId'); 
        let res =  await axios.post(`${API_BASE_URL}/orders/list`,{emailId});
        console.log(res,'haii')
        if(res?.data?.length >0 ){
          setOrders(res?.data)
        }
      } catch (err) {
        console.log(err);
      }
   })();
},[]) 
    return (
        <>
        {(orders?.length > 0 || true)  ? <>
        <Grid container={true}>
            <Grid item={true} xs={12} sx={{marginTop:5, marginBottom:5}}>
                <Typography variant="h5">The following are the orders successfully placed</Typography>
            </Grid>
            <Grid item={true} xs={12}>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Order ID</StyledTableCell>
            <StyledTableCell align="right">Order Date</StyledTableCell>
            <StyledTableCell align="right">Books Placed</StyledTableCell>
            <StyledTableCell align="right">Order Price</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.orderId}  
              </StyledTableCell>
              <StyledTableCell align="right">{new Date(row.orderDate).toLocaleDateString()}</StyledTableCell>
              <StyledTableCell align="right">{row?.books}</StyledTableCell>
              <StyledTableCell align="right">${row.orderPrice}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
    </Grid>
        </> :  <span>You dont have any orders. Please place your order by <Link to="/books">clicking here</Link></span>}
        </>
    );
}
export default Orders;