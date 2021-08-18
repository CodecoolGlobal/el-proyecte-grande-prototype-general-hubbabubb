
import {useEffect, useState} from 'react';


import {Spinner} from 'react-bootstrap';
import AddShoppingCartSharpIcon from '@material-ui/icons/AddShoppingCartSharp';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
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


export const GroceryList = () => {


    const sampleData =
        [{itemName : 'apple', id: 1, checked: false}, {itemName: "potato", id: 2, checked:true}, {itemName: "orange", id:3, checked:false},{itemName: "milk", id:4, checked:false}]

    const [loadedIngredients, setLoadedIngredients] = useState([]);
    const [items, setItems] = useState(sampleData)
    const [idCounter,setIdCounter] = useState(5);
    const [inputValue, setInputValue] = useState('');


    // const getGroceries = async () => {
    //     // // TODO: grocery list id here as well
    //     // const groceryLink = "http://localhost:8000/grocery/list/1"
    //     // await fetch(groceryLink)
    //     //     .then(response => response.json()
    //     //         .then((json) => setItems(json)))
    //     setItems(sampleData)
    // }

    useEffect(() => {
        fetch('/api/v1/ingredient')
            .then(response => response.json())
            .then(data => {
                let result = [];
                for (let key in data) {
                    result.push(key)
                }
                setLoadedIngredients(result);
            });
    }, [])



    const handleAddButtonClick = () => {
        if (inputValue === "") {
            return;
        }
        const newItem = {
            itemName: inputValue,
            checked: true,
            id: idCounter
        };
        setIdCounter(idCounter + 1);
        const newItems = [...items, newItem];
        // // TODO need to add list ID of course later
        // fetch(`http://localhost:8000/grocery/add/${inputValue}`).catch((e) => {
        //     console.log(e)
        // });
        setItems(newItems)
        setInputValue("");
    };

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
                            {!!selected.length && <ClearButton onClick={onClear} />}
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
                    const labelId = `checkbox-list-label-${value.id}`;
                    return (
                        <ListItem className={"grocery-item"} key={value.id} role={undefined} dense button onClick={() => toggleComplete(value.id)}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={!value.checked}
                                    color={"default"}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{'aria-labelledby': labelId}}
                                />

                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value.checked ? value.itemName :
                                <strike>{value.itemName}</strike>}/>
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