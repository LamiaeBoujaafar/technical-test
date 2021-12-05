import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import axios from "axios";
import {useState, useEffect} from 'react';
import Typography from '@mui/material/Typography';
import {Box, DialogContent, Link} from "@mui/material";
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

export default function TrackInformation(props) {
    const {onClose, open, trackId} = props;
    const [track, setTrack] = useState([]);
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(res => {
            setTrack(res.data)
            setArtists(res.data.artists)
        })
    }, [trackId])
    console.log("track ------", track)
    return (
        <Dialog open={open} onClose={onClose}>
            <Box sx={{display: 'flex'}}>
                <CardContent sx={{display: 'flex', flexDirection: 'column'}}>
                    <DialogTitle sx={{textAlign: 'center'}} color="text.secondary">{track.name} </DialogTitle>
                    <DialogContent sx={{flex: '1 0 auto'}}>
                        <Link href={track?.uri}>Link</Link>
                        <Typography variant="duration_ms" gutterBottom component="div">
                            Duration : {track?.duration_ms}s
                        </Typography>
                        <Typography sx={{marginTop: 1, fontWeight: 'bold'}} >Album</Typography>
                        <Typography variant="name" gutterBottom component="div">
                            Name : {track?.album?.name}
                        </Typography>
                        <Typography variant="total_tracks" gutterBottom component="div">
                            Total tracks : {track?.album?.total_tracks}
                        </Typography>
                        <Typography variant="release_date" gutterBottom component="div">
                            Release date : {track?.album?.release_date}
                        </Typography>
                        <Typography sx={{marginTop: 1, fontWeight: 'bold'}} >Artist (s)</Typography>
                        {artists.map((artist) => (
                            <Typography variant="artist" gutterBottom component="div" key={artist.id}>
                                {artist?.name}
                            </Typography>
                        ))}

                    </DialogContent>
                </CardContent>
                <CardMedia
                    component="img"
                    sx={{width: 250}}
                    image={track.album?.images[0]?.url}
                    alt="Track image"
                />
            </Box>
        </Dialog>
    );
}

