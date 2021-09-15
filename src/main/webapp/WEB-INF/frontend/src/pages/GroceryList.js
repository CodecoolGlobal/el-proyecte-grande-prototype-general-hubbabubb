import {useEffect, useState} from 'react';
import {deleteFetch, fetchNoResponse, getFetchWithAuth, putFetch} from '../util/fetchData'
import {Spinner} from 'react-bootstrap';
import AddShoppingCartSharpIcon from '@material-ui/icons/AddShoppingCartSharp';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import KitchenIcon from '@material-ui/icons/Kitchen';
import {
    Checkbox,
    Fab,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText
} from "@material-ui/core";
import Typeahead from 'react-bootstrap-typeahead/lib/components/AsyncTypeahead';
import HighlightOffSharpIcon from '@material-ui/icons/HighlightOffSharp';
import AuthenticationService from "../util/AuthenticationService";

export const GroceryList = () => {


    const [loadedIngredients, setLoadedIngredients] = useState([]); // USE CONTEXT FOR THIS FETCHING every time is not good for obvious reasons, that list is never change
    const [items, setItems] = useState()
    const [itemAdded, setItemAdded] = useState(false)
    const [inputValue, setInputValue] = useState('');


    const getGroceries = async () => {

        const groceryLink = `/api/v1/pantry/grocery-list/${AuthenticationService.getLoggedInUserName()}`
        getFetchWithAuth(groceryLink,(data) => {setItems(data)},(error) => {
            console.log(error)})

    }

    useEffect(() => {
        fetch('/api/v1/extended-ingredient')
            .then(response => response.json())
            .then(data => {
                let result = [];
                for (let key in data) {
                    result.push(key)
                }
                setLoadedIngredients(result);
            });
    }, [])

    useEffect(() => {
        getGroceries().catch(e => console.log(e))

    },[itemAdded])



    const handleAddButtonClick = async () => {
        if (inputValue === "") {
            return;
        }
        let groceryLink = `/api/v1/pantry/grocery-list/add/${AuthenticationService.getLoggedInUserName()}/${inputValue}` // pantry ID should be dynamic
        fetchNoResponse(groceryLink, "POST")
        setInputValue("");
        setItemAdded(!itemAdded)
    };

    const removeItem = (id) => {
        let newList = items.filter(item => item.id !== id)
        setItems(newList)
        deleteFetch(`/api/v1/pantry/list-item/delete/${id}`,(err) => {console.error(err)})

    }




    function handleChange(selectedOptions) {
        setInputValue(selectedOptions);
    }

    const toggleComplete = (id) => {
        const newItems = [...items];
        newItems.forEach(item => {
            if (item.id === id) {
                putFetch(`/api/v1/pantry/toggle-item-status/${item.id}`,(err) =>console.error(err));
                item.checked = !item.checked;
            }
        })
        setItems(newItems);
    };


    function removeAllChecked() {
        let newList = items.filter(item => item.checked === true)
        setItems(newList)
    }

    return (

        <div className="grocery-list-container">

            <h1>Grocery List</h1>
                 <Typeahead
                     className="cart"
                     onChange={handleChange}
                    id="ingredients"
                    options={loadedIngredients}
                    placeholder="Choose an ingredient...">

                    {({ onClear, selected }) => (
                        <div className="rbt-aux">
                            {!!selected.length && <HighlightOffSharpIcon  onClick={onClear} />}
                            {!selected.length && <Spinner animation="fade" size="sm" />}
                        </div>
                    )}
                </Typeahead>
                <Fab color="default" aria-label="add" onClick={() => handleAddButtonClick()}>
                    <AddShoppingCartSharpIcon />
                </Fab>


            <div className={"grocery-list"}>
            <List >
                {items && items.map((value) => {
                    let bigStartingLetter = value.ingredientName.charAt(0).toUpperCase() + value.ingredientName.slice(1)

                    const labelId = `checkbox-list-label-${value.id}`;
                    return (
                        <ListItem className={"grocery-item"} key={value.id} role={undefined} dense button onClick={() => toggleComplete(value.id)}>
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
                            <ListItemText id={labelId} primary={!value.checked ? bigStartingLetter :
                                <strike>{bigStartingLetter}</strike>}/>
                            <ListItemSecondaryAction>
                                <IconButton edge="end" onClick={() => removeItem(value.id)} aria-label="delete">
                                    <KitchenIcon color={"default"}/>
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
                <Fab variant="extended">Clear list<RemoveShoppingCartIcon color={"default"} onClick={removeAllChecked}/>

                </Fab>
            {/*</IconButton>*/}
        </div>

    )
}