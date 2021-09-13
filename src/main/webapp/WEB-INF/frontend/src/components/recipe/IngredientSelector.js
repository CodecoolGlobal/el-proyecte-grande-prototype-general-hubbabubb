import {Button, makeStyles} from "@material-ui/core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons";
import Typeahead from "react-bootstrap-typeahead/lib/components/AsyncTypeahead";
import React, {useEffect, useRef, useState} from "react";
import {getFetch} from "../../util/fetchData";

const useStyles = makeStyles((theme) => ({
    typography: {
        fontFamily: "Oswald",
        fontSize: 14,
    },
}));


export default function IngredientSelector({setSelector, handler}) {
    const classes = useStyles();
    const [loadedIngredients, setLoadedIngredients] = useState([]);

    const setSelected = setSelector;
    const handleAddButtonClick = handler;

    useEffect(() => {
        getFetch('/api/v1/extendedIngredient', (data) => {
            let result = [];
            for (let key in data) {
                result.push(key)
            }
            setLoadedIngredients(result);
        }, (error) => {
            console.log(error.message);
        })
        console.log("Yeah")
    }, [])

    function handleChange(selectedOptions) {
        setSelected(selectedOptions);
    }

    function handleSelect() {
        handleAddButtonClick();
        selector.current.clear();
    }

    const selector = useRef();

    return <Typeahead
        onChange={handleChange}
        id="ingredients"
        options={loadedIngredients}
        placeholder="Choose an extendedIngredient..."
        className="typeahead"
        ref={selector}
    >
        {({onClear, selected}) => (
            <div>
                {!!selected.length && <div>
                    <Button variant="outlined" color="primary" className={classes.typography} onClick={handleSelect}>
                        <FontAwesomeIcon icon={faPlusSquare}/> Add to pantry
                    </Button>
                </div>}
            </div>
        )}
    </Typeahead>
}