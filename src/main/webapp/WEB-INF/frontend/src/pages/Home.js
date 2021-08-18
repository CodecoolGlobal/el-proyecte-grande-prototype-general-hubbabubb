import {useState, useEffect} from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import {Typeahead, ClearButton} from 'react-bootstrap-typeahead';
import {Spinner} from "react-bootstrap";


function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedIngredients, setLoadedIngredients] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetch('/api/v1/ingredient')
            .then(response => response.json())
            .then(data => {
                let result = [];
                for (let key in data) {
                    result.push(key)
                }
                setIsLoading(false);
                setLoadedIngredients(result);
                console.log(result);
            });
    }, [])

    /*const [pantry, setPantry] = useState({});

    useEffect(() => {
        fetch('api/v1/pantry/1')
            .then(response => response.json())
            .then(data => {
                setPantry(data);
                console.log(pantry);
            });
    }, [])*/



    if (isLoading) {
        return <section>
            <p>Loading...</p>
        </section>
    }



    return <section>

    </section>
}

export default Home;