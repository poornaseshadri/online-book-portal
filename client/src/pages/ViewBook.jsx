import { Button, Grid, Paper, Typography } from "@mui/material";

const ViewBook = (props) =>{
    const {book, handleAddtoCart, isPresentinCart} = props;
    return (
      <Grid item={true} key={book.id}>
      <Paper elevation={4} sx={{marginTop:4, padding:2, marginRight:4}}>
          <Grid item={true}>  <img src={book.cover} alt="" style={{height:'300px', width:'250px'}} /></Grid>
         <Grid item={true}>  <Typography variant='h5'>{book.title}</Typography></Grid>
         <Grid item={true}>  <Typography>{book.desc}</Typography></Grid>
         <Grid item={true}>    <Typography>Price: ${book.price}</Typography></Grid>
         <Grid item={true} style={{textAlign:'center'}}> <Button sx={{marginTop:1}} variant='contained' onClick={()=>handleAddtoCart(book)} color ={isPresentinCart(book) ?  'success' : 'primary' }>{isPresentinCart(book) ? 'REMOVE' : 'ADD TO CART'}</Button>
         </Grid>
          </Paper>
          </Grid>
    )
    }

    export default ViewBook;