import {Box, Button, Card, CardContent, IconButton, Typography} from "@mui/material";
import React from "react";
import {useMovieDetail} from "../../handlers/movie-detail";
import { useParams } from 'react-router';
import {useNavigate} from "react-router-dom";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';


const Detail = () => {
    const params = useParams();
    const navigate = useNavigate();
    const {data} = useMovieDetail(params.imdbID as string)

    return(
        <Box sx={{minWidth: 350, padding:6 }}>
            <IconButton onClick={() => navigate(-1)} style={{ backgroundColor: 'black', marginBottom:5, color: 'white' }}>
                <ArrowLeftIcon />
            </IconButton>
            <Card sx={{display:"flex", alignItems: "center" }}>
                <img src={data?.Poster} alt={data?.Title}/>
                <CardContent>
                    <Typography variant="h4" component="div" color='#002160'>
                        {data?.Title}
                    </Typography>
                    <Typography variant="subtitle1" component="div" color="black">
                        {data?.Genre}  //  {data?.Released}
                    </Typography>
                    <Typography variant="subtitle2" component="div">
                        {data?.Director}
                    </Typography>
                    <Typography variant="subtitle2" component="div">
                         {data?.Cast}
                    </Typography>
                    <Typography variant="subtitle2" component="div">
                       IMDb:  {data?.imdbRating}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {data?.Plot}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontSize:14 }} color="text.primary">
                        {data?.Language}  //  {data?.Runtime}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

export default Detail
