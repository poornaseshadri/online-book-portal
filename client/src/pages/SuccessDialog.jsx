import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from '@mui/material';


export default function SuccessDialog(props) {
    const navigate = useNavigate();
    const { orderId, openModal } = props;
    return (
        <React.Fragment>
            <Dialog
                open={openModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Grid container={true} spacing={2} sx={{ padding: 6 }}>
                    <Grid item={true}>
                               <Typography> Congratulations! Your order <b>{orderId}</b> is placed succesfully.</Typography>
                    </Grid>
                    <Grid item={true} style={{margin:'auto'}} >
                            <Grid item={true}  style={{marginTop:10}}>
                                <Button variant="contained" onClick={() => navigate('/orders')}>View All Orders</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
        </React.Fragment>
    );
}