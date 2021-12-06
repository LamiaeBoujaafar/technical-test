import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import {useState, useEffect} from 'react';
import axios from 'axios';
import TrackInformation from "./TrackInformation";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export default function SearchTracks() {
    const [tracks, setTracks] = useState([]);
    const [nextData, setNextData] = useState("");
    const [searchedValue, setSearchedValue] = useState("");
    const [showInformation, setShowInformation] = useState(false);
    const [trackId, setTrackId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleOnChange = (event) => {
        setSearchedValue(event.target.value);
    }
    const handleOnSearchClick = () => {
        if (searchedValue !== "") {
            setIsLoading(true);
            axios.get(`https://api.spotify.com/v1/search?q=${searchedValue}&type=track&include_external=audio`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            }).then(res => {
                setNextData(res?.data?.tracks?.next)
                setTracks(res.data?.tracks?.items);
                setIsLoading(false);
            })
        }
    }
    const fetchMoreData = () => {
        axios.get(`${nextData}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(res => {
            setNextData(res?.data?.tracks?.next);
            setTracks(p => p.concat(res.data?.tracks?.items));
            console.log("next data", tracks);
        })
    }
    const handleOnTrackClick = (trackId) => {
        setTrackId(trackId)
        setShowInformation(true)
    }
    return (
        <Grid container mt={0} mb={4} flexDirection="column">
            <Grid item container mb={2} mt={2}>
                <TextField mt={2} onChange={handleOnChange} value={searchedValue}/>
                <Button variant="contained" sx={{marginLeft: 2}} onClick={handleOnSearchClick}>Search</Button>
            </Grid>
            {isLoading ? <Spinner/> :

                <InfiniteScroll
                    dataLength={tracks.length}
                    next={fetchMoreData}
                    hasMore={nextData ? true : false}
                    loader={<h4>Loading...</h4>}
                >
                    <Grid item container spacing={4}>
                        {tracks.map((track) => (
                            <Grid item key={track.id}>
                                <Card
                                    sx={{height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer'}}>
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            height: 200,
                                            width: 200
                                        }}
                                        image={track.album.images[0].url}
                                        alt={track.album.name}
                                        onClick={() => handleOnTrackClick(track.id)}
                                    >
                                    </CardMedia>
                                </Card>
                            </Grid>
                        ))}

                    </Grid>
                </InfiniteScroll>}


            {showInformation &&
            <TrackInformation open={showInformation} onClose={() => setShowInformation(false)} trackId={trackId}/>}


        </Grid>
    );
}
