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

    if (isLoading) {
        return <section>
            <p>Loading...</p>
        </section>
    }



    return <section>
        <h1>All ingredients:</h1>
        <Typeahead
            id="ingredients"
            options={loadedIngredients}
            placeholder="Choose an ingredient...">
            {({ onClear, selected }) => (
                <div className="rbt-aux">
                    {!!selected.length && <ClearButton onClick={onClear} />}
                    {!selected.length && <Spinner animation="grow" size="sm" />}
                </div>
            )}
        </Typeahead>
    </section>
}

export default Home;