import { Grid, Paper, Typography } from "@mui/material";
import homeBooks from "./homeBooks";

const Home = () =>{

    return (<>
    <Grid container={true} sx={{padding:10}}>
        <Grid item={true} xs={12}><Typography variant="h5">{homeBooks?.homeContent}</Typography></Grid>
        <Grid item={true} xs={12}>
            {homeBooks?.content?.map((book)=>{return(
                <Paper elevation={4} sx={{padding:4, marginTop:4}}> 
                    <Grid container={true}>
                        <Grid item={true} xs={2}><img style={{height:'100px', width:'150px'}} src={book?.img} alt=""/></Grid>
                        <Grid item={true} xs={10}>
                        <Grid container={true}>
                        <Grid item={true}><Typography><b>{book?.title}</b></Typography></Grid>
                        <Grid item={true}><Typography>{book?.details}</Typography></Grid>
                        </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            )
            })}
        </Grid>
        <Grid item={true} xs={12}><Typography sx={{marginTop:5}}>{homeBooks?.endContent}</Typography></Grid>
        </Grid> 

    </>
    );
}
export default Home;