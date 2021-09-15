import {LinearProgress} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {hostName} from "../util/constants";
import {getFetchWithAuth} from "../util/fetchData";
import {LargeHeader} from "../components/Common";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSadCry} from "@fortawesome/free-regular-svg-icons";
import {faCookie} from "@fortawesome/free-solid-svg-icons";
import RecipeList from "../components/recipe/RecipeList";
import {RecipesContainer} from "./RecipesByName";
import ContentSelector from "../components/pantry/ContentSelector";
import AuthenticationService from "../util/AuthenticationService";

export const RecipesFromPantry = () => {

    const sampleData =
        [{ingredientName: 'apple'}, {ingredientName: "potatoes"}, {ingredientName: "bread"}, {ingredientName: "beef"}]

    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState(sampleData)

    useEffect(() => {
        const searchURL = `${hostName}/api/v1/recipe/by-ingredients/${AuthenticationService.getLoggedInUserName()}`;
        getFetchWithAuth(searchURL, (jsonData) => {
            setRecipes(jsonData.recipes);
            console.log(jsonData)
            setContent(jsonData.content);
            setLoading(false);
        }, (error) => {
            console.log(error)
        })
    }, [])

    if (loading) { return <LinearProgress variant={"query"} color={"primary"} />}

    if (recipes.length === 0) {
        return <RecipesContainer>
            <LargeHeader><FontAwesomeIcon icon={faSadCry}/> No recipes found!</LargeHeader>
        </RecipesContainer>
    }


    const methods = {setContent, content};

    return <RecipesContainer>
        <LargeHeader><FontAwesomeIcon icon={faCookie}/> Recipes from your pantry content:</LargeHeader>
        <ContentSelector methods={methods} />
        { content.length !== 0 &&
        <RecipeList recipes={recipes} /> }
    </RecipesContainer>
}