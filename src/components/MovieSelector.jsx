import { useState, useEffect } from "react";


export default function MovieSelector() {
    const [ allMovies, setAllMovies ] = useState(null);
    const [error, setError] = useState("");
    const [ selectedGenre, setSelectedGenre ] = useState(null);
    let loading = !allMovies ? true : false; 
    console.log("render...");
    console.log(allMovies);
    console.log(selectedGenre);

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

    if (selectedGenre) {
        moviesJSX = allMovies[selectedGenre].map((movie, index) => <li key={index}>{ movie }</li>);
        
    }

    if (loading) {
        return (
            <div>
                <h3>Loading...</h3>
            </div>
        )
    }
    genresJSX = Object.keys(allMovies).map(genre => <option key={genre} value={ genre }>{ genre }</option>);
    return (
        <div>
            <h1>List of top 5 movies by genres</h1>
            <label>
            Pick a genre: 
                <select name="selectedGenre" defaultValue={ Object.keys(allMovies)[0] } onChange={(e) => setSelectedGenre(e.target.value)}>
                    { genresJSX }
                </select>
            </label>
            <ol>
                { moviesJSX }
            </ol>
        </div>
    )
}