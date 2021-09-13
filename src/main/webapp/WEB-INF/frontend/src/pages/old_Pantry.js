import {useEffect, useState} from 'react';


import {Spinner} from 'react-bootstrap';
import AddShoppingCartSharpIcon from '@material-ui/icons/AddShoppingCartSharp';
import DeleteIcon from '@material-ui/icons/Delete';
import KitchenIcon from '@material-ui/icons/Kitchen';
import {
    Checkbox,
    Fab,
    IconButton, List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText
} from "@material-ui/core";
import Typeahead from 'react-bootstrap-typeahead/lib/components/AsyncTypeahead';
import {ClearButton} from 'react-bootstrap-typeahead';
import {getFetch} from "../util/fetchData";
import AuthenticationService from "../util/AuthenticationService";


const Pantry = () => {
    const sampleData =
        [{itemName: 'apple', id: 1, checked: false}, {itemName: "potato", id: 2, checked: false}, {
            itemName: "bread",
            id: 3,
            checked: true
        }, {itemName: "olive oil", id: 4, checked: false}]

    const [idCounter, setIdCounter] = useState(5);
    const [loadedIngredients, setLoadedIngredients] = useState([]);
    const [items, setItems] = useState(sampleData)
    const [inputValue, setInputValue] = useState('');

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


    const handleAddButtonClick = () => {

        const newItem = {
            itemName: inputValue,
            checked: false,
            id: idCounter
        };
        setIdCounter(idCounter + 1)
        const newItems = [...items, newItem];

        setItems(newItems)
        setInputValue("");
    };

    function removeAllChecked() {
        let newList = items.filter(item => item.checked)
        setItems(newList)
    }

    // TODO: collect list methods and remove duplications
    const removeItem = (id) => {
        let newList = items.filter(item => item.id !== id)
        setItems(newList)
    }


    function handleChange(selectedOptions) {
        setInputValue(selectedOptions);
    }

    const toggleComplete = (id) => {
        const newItems = [...items];
        newItems.forEach(item => {
            if (item.id === id) {
                // fetch(`http://localhost:8000/grocery/toggle/${item.id}`).catch(e => console.log(e))
                item.checked = !item.checked;
            }
        })
        setItems(newItems);
    };


    return (

        <div className="grocery-list-container">

            <h1>Fridge content</h1>
            <Typeahead
                onChange={handleChange}
                id="ingredients"
                options={loadedIngredients}
                placeholder="Choose an extendedIngredient...">
                {({onClear, selected}) => (
                    <div className="rbt-aux">
                        {!!selected.length && <ClearButton onClick={onClear}/>}
                        {!selected.length && <Spinner animation="fade" size="sm"/>}
                    </div>
                )}
            </Typeahead>
            <Fab color="default" aria-label="add" onClick={() => handleAddButtonClick()}>
                <KitchenIcon/>
            </Fab>


            <div className={"grocery-list"}>
                <List>
                    {items && items.map((value) => {
                        const labelId = `checkbox-list-label-${value.id}`;
                        return (
                            <ListItem className={"grocery-item"} key={value.id} role={undefined} dense button
                                      onClick={() => toggleComplete(value.id)}>
                                <ListItemIcon>


                                    <Checkbox
                                        edge="start"
                                        checked={value.checked}
                                        color={"default"}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{'aria-labelledby': labelId}}
                                    />

                                </ListItemIcon>
                                <ListItemText id={labelId} primary={!value.checked ? value.itemName :
                                    <strike>{value.itemName}</strike>}/>
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" onClick={() => removeItem(value.id)} aria-label="delete">
                                        <AddShoppingCartSharpIcon color={"default"}/>
                                        {/*<RemoveShoppingCartIcon color={"default"}/>*/}
                                    </IconButton>
                                </ListItemSecondaryAction>

                            </ListItem>
                        );
                    })}
                </List>
            </div>
            <h3>Remove checked items</h3>
            {/*<IconButton edge="end" aria-label="delete">*/}
            <Fab variant="extended">Clear list<DeleteIcon color={"default"} onClick={removeAllChecked}/>

            </Fab>
            {/*</IconButton>*/}
        </div>

    )
}