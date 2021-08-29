import {
    Checkbox, Button,
    Divider,
    Fab,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper, Link
} from '@material-ui/core';
import React, {useState} from 'react';
import LaunchIcon from '@material-ui/icons/Launch';
import {NavLink} from 'react-bootstrap';

export const FromMyPantry = () => {

    const sampleData =
        [{itemName: 'apple', id: 1, checked: false}, {itemName: "potato", id: 2, checked: false}, {
            itemName: "bread",
            id: 3,
            checked: false
        }, {
            itemName: "beef",
            id: 4,
            checked: false
        }]

    const [items, setItems] = useState(sampleData)
    const [recipes, setRecipes] = useState()
    const spacing = 2
    let ingredients = "";

    const getRecipes = async () => {
        const myHeaders = new Headers();
        myHeaders.append('Authorization', localStorage.jwtToken);
        const searchURL = `http://localhost:8080/api/v1/recipe/by-ingredients/${ingredients}`
        fetch(
            searchURL, {method: 'GET', headers: myHeaders}).then(response =>
            response.json()).then(json =>
            setRecipes(json)).catch(err => console.log(err.message))
        console.log(recipes)
    };



    const handleAddButtonClick = () => {
        for (let item of items) {
            if (!item.checked) {
                ingredients += "," + item.itemName
            }
        }

        getRecipes().catch(e => console.log(e.message));
        ingredients = "";


    };

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
        <div className={"grocery-list-container"}>
            <h1>Cook from my pantry</h1>
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
                                        color={"secondary"}
                                        tabIndex={-1}
                                        indeterminate
                                        // inputProps={{ 'aria-label': 'indeterminate checkbox' }}
                                        inputProps={{'aria-labelledby': labelId}}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={!value.checked ? value.itemName :
                                    <strike>{value.itemName}</strike>}/>
                                {/*<ListItemSecondaryAction>*/}
                                {/*    <IconButton edge="end" onClick={() => removeItem(value.id)} aria-label="delete">*/}
                                {/*        <AddShoppingCartSharpIcon color={"default"}/>*/}
                                {/*        /!*<RemoveShoppingCartIcon color={"default"}/>*!/*/}
                                {/*    </IconButton>*/}
                                {/*</ListItemSecondaryAction>*/}


                            </ListItem>
                        );
                    })}
                </List>
                <label>Search by ingredients:</label>
                <Button color={"primary"} onClick={handleAddButtonClick}>Search</Button>
            </div>

            <div>
                <Grid container xs={12} spacing={1}>
                    <Grid item xs={12}>
                        <Grid wrap={"wrap"} container direction={"row"} justifyContent={"space-evenly"}
                              alignItems={"flex-start"} spacing={spacing}>
                            {recipes && recipes.map(recipe =>


                                <Grid key={recipe.id} style={{textAlign: "center"}} item>
                                    <h2>{recipe.title}</h2>
                                    <NavLink to={`/recipe/${recipe.id}`}>
                                        <img className="recipeImageBox"
                                             src={recipe.image}
                                             alt="Kép, valami nem jó"/>
                                    </NavLink>
                                    <Divider variant="middle"/>
                                    {/*<p><QueryBuilderRoundedIcon/> 45 minutes </p>*/}
                                    {/*<p><FontAwesomeIcon icon={faTemperatureHigh}/> 180 °C</p>*/}

                                    <Link style={{textDecoration: 'none'}} to={`/recipe/${recipe.id}`}>
                                        <Fab variant="extended"
                                             color={"default"}
                                             size={"large"}

                                        >Recipe<LaunchIcon/></Fab>
                                    </Link>
                                    <Paper/>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>

                </Grid>
            </div>

        </div>
    )
}