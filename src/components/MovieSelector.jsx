import { useState, useEffect, useMemo } from "react";


export default function MovieSelector() {
    const [ allMovies, setAllMovies ] = useState(null);
    const [error, setError] = useState("");
    const [ selectedGenre, setSelectedGenre ] = useState(null);
    let loading = !allMovies ? true : false; 

    // simulates fetching data from a server. data.json is in the public folder served by Vite's server
    const fetchData = async () => {
        try {
            const response = await fetch("/data.json");
            if (!response.ok) {
                throw new Error();
            }
            const data = await response.json();
            setAllMovies(data);
        } catch (err) {
            setError("Something went wrong: failed to fetch data.");
        }
    }

    useEffect(() => {
        setTimeout(fetchData, 2000);
    }, []);

    let genresJSX = allMovies 
        ? Object.keys(allMovies).map(genre => <option key={genre} value={ genre }>{ genre }</option>)
        : null; 

    // runs only if selectedGenre or allMovies has changed
    let moviesJSX = useMemo(() => {
        let res = null;
        if (allMovies) {
            if (selectedGenre) {
                res = allMovies[selectedGenre].map((movie, index) => <li key={index}>{ movie }</li>);
            } else {
                // default value for the displayed movies is the first option
                res = allMovies[Object.keys(allMovies)[0]].map((movie, index) => <li key={index}>{ movie }</li>);
            }
        }
        return res;    
    }, [selectedGenre, allMovies]);
        
    
    // if there is an error returns the error message
    if (error) {
        return (
            <div>{ error }</div>
        )
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