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
import React, {useContext, useEffect, useState} from 'react';
import LaunchIcon from '@material-ui/icons/Launch';
import {NavLink} from 'react-bootstrap';
import {hostName} from "../util/constants";
import {SearchInput} from "../store/recipe-search-input";
import {getFetchWithAuth} from "../util/fetchData";
import {LargeHeader} from "../components/Common";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSadCry} from "@fortawesome/free-regular-svg-icons";
import {faCookie, faSearch} from "@fortawesome/free-solid-svg-icons";
import RecipeList from "../components/recipe/RecipeList";
import {RecipesContainer} from "./RecipesByName";

export const RecipesFromPantry = () => {

    const sampleData =
        [{itemName: 'apple', id: 1, checked: false}, {itemName: "potatoes", id: 2, checked: false}, {
            itemName: "bread",
            id: 3,
            checked: false
        }, {
            itemName: "beef",
            id: 4,
            checked: false
        }]

    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        let pantryContent = sampleData.map((item) => {
            return item.itemName;
        }).join("+");


        const searchURL = `${hostName}/api/v1/recipe/by-ingredients/${pantryContent}`;
        console.log(searchURL)
        getFetchWithAuth(searchURL, (jsonData) => {
            console.log(jsonData);
            setRecipes(jsonData)
        }, (error) => {
            console.log(error)
        })
    }, [])

    if (recipes.length === 0) {
        return <RecipesContainer>
            <LargeHeader><FontAwesomeIcon icon={faSadCry}/> No recipes found!</LargeHeader>
        </RecipesContainer>
    }

    return <RecipesContainer>
        <LargeHeader><FontAwesomeIcon icon={faCookie}/> Recipes from your pantry content:</LargeHeader>
        <RecipeList recipes={recipes}/>
    </RecipesContainer>
}