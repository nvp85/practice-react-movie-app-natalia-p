import { useState, useEffect } from "react";


export default function MovieSelector() {
    const [ allMovies, setAllMovies ] = useState(null);
    const [error, setError] = useState("");
    const [ selectedGenre, setSelectedGenre ] = useState(null);
    let loading = !allMovies ? true : false; 

    // simulates fetching data from a server. data.json is in the public folder served by Vite's server
    const fetchData = async () => {
        const response = await fetch("/data.json");
        if (!response.ok) {
            setError(`Failed to fetch the movie data. HTTP response code: ${response.status}`);
            return;
        }
        const data = await response.json();
        setAllMovies(data);
        
    }

    useEffect(() => {
        fetchData();
    }, []);

    let moviesJSX;
    let genresJSX;
    if (allMovies) {
        genresJSX = Object.keys(allMovies).map(genre => <option key={genre} value={ genre }>{ genre }</option>); 
        // default value for the displayed movies is the first option
        moviesJSX = allMovies[Object.keys(allMovies)[0]].map((movie, index) => <li key={index}>{ movie }</li>);
    }
    if (selectedGenre) {
        moviesJSX = allMovies[selectedGenre].map((movie, index) => <li key={index}>{ movie }</li>);
    }
    
    return (
        <>
        {loading
            ?
            (<div>
                <h3>Loading...</h3>
            </div>)
            :
            (<div>
                <h1>List of top 5 movies by genres</h1>
                <label>
                Pick a genre: 
                    <select 
                        name="selectedGenre" 
                        defaultValue={ Object.keys(allMovies)[0] } 
                        onChange={(e) => setSelectedGenre(e.target.value)}
                    >
                        { genresJSX }
                    </select>
                </label>
                <ol>
                    { moviesJSX }
                </ol>
            </div>)
        }
        </>
    )
}