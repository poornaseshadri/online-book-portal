import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "./config";
import { Button, Grid, Typography } from "@mui/material";
import ViewBook from "./ViewBook";
import SuccessDialog from "./SuccessDialog";
import Badge from '@mui/material/Badge';
import { useNavigate } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [openModal, setOpenModal] = useState(false);
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();



  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/books`);
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);


  const handleAddtoCart = (book) => {
    if(sessionStorage.getItem('userId')===''){
      navigate('/')
    }
    else if (isPresentinCart(book)) {
      const tempBooks = cart;
      const findIndex = tempBooks?.findIndex(item => item?.id === book?.id);
      tempBooks?.splice(findIndex, 1);
      setCart(tempBooks);
      forceUpdate();
    } else {
      const updatedCart = cart
      updatedCart.push(book);
      setCart(updatedCart);
      forceUpdate();
    }
  }

  const isPresentinCart = (book) => {
    return cart?.length ? cart?.find(item => item?.id === book.id) : false;
  }

  const handleCheckout = async () => {
    const bookNames = [];
    const bookIds = [];
    let cartPrice = 0;
    cart?.forEach(book => {
      bookNames.push(book?.title);
      bookIds.push(book?.id);
      cartPrice = cartPrice + book?.price;

    });
    const reqBody = {
      orderId: String(parseInt(Math.random() * 10000000000)),
      orderDate: new Date(),
      email: sessionStorage.getItem('userId'),
      books: bookNames?.join(),
      bookIds: bookIds?.join(),
      orderPrice: cartPrice
    }
    try {
      let res = await axios.post(`${API_BASE_URL}/orders/checkout`, reqBody);
      console.log(res, 'hai response from api')
      if (res?.data?.orderId) {
        setOrderId(res?.data?.orderId);
        setOpenModal(true)
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      {books?.length > 0 && <div>
        <Typography sx={{ marginTop: 4, marginBottom: 4 }} variant="h5">Add the books you want to read and proceed to checkout</Typography>
        <Grid container={true} xs={12}>
          <Grid container={true}>
            {books.map((book) => (
              <Grid item={true} xs={3}>
                <ViewBook book={book} handleAddtoCart={handleAddtoCart} isPresentinCart={isPresentinCart} />
              </Grid>
            ))}
          </Grid>
          <Grid container={true} sx={{ margin: '15px 0px' }} justifyContent={'space-between'}>
            <Grid item={true}>
              <Button variant='contained' color='error' onClick={() => setCart([])} disabled={cart?.length === 0}>Discard Changes</Button>
            </Grid>
            <Grid item={true}>
              <Badge color={"secondary"} badgeContent={cart?.length}>
                <Button variant='contained' color='primary' onClick={handleCheckout} disabled={cart?.length === 0}>Proceed to Checkout</Button>
              </Badge>
            </Grid>
          </Grid>
        </Grid>
        {openModal && <SuccessDialog openModal={openModal} orderId={orderId} />}
      </div>}
    </>

  );
};

export default Books;
