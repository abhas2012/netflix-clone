import React, { useState, useEffect } from 'react';
import axios from './axios';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const baseURL = 'https://image.tmdb.org/t/p/original';

function Row({title,fetchURL,isLargeRow}) {
    const opts ={
        height:'390px',
        width:'100%',
        playerVars:{//'https://developers.google.com/youtube/player_parameters',
        autoplay:1,},
    };
    const [movies,setMovies] = useState([]);
    const [trailerURL,setTrailerURL] = useState('');
    useEffect(() =>{
        async function fetchData(){
            const request = await axios.get(fetchURL);
            setMovies(request.data.results);
            return request;
            
        }
        fetchData();
    },[fetchURL]);

    const handleClick = (movie) => {
        if(trailerURL)
        {
            setTrailerURL('');
        }
        else
        {
            movieTrailer(movie?.name || "").then(url =>{
                const URLParams = new URLSearchParams(new URL(url).search);
                setTrailerURL(URLParams.get('v'));
            }).catch(err => {console.log(err)});
        }

    };

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map(movie => (
                    <img key={movie.id} src={`${baseURL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} className={`row_poster && ${isLargeRow && 'row__posterLarge'}`} onClick={() => handleClick(movie)}/>


                ))}
            </div>
            {trailerURL && <YouTube videoId={trailerURL} opts={opts}/>}
        </div>
    )
}

export default Row