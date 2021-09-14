import {
     LinearProgress
} from '@material-ui/core';
import React, {useContext, useEffect, useState} from 'react';
import {hostName} from "../util/constants";
import {getFetchWithAuth} from "../util/fetchData";
import {LargeHeader} from "../components/Common";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSadCry} from "@fortawesome/free-regular-svg-icons";
import {faCookie} from "@fortawesome/free-solid-svg-icons";
import RecipeList from "../components/recipe/RecipeList";
import {RecipesContainer} from "./RecipesByName";
import ContentSelector from "../components/pantry/ContentSelector";

export const RecipesFromPantry = () => {

    const sampleData =
        [{ingredientName: 'apple'}, {ingredientName: "potatoes"}, {ingredientName: "bread"}, {ingredientName: "beef"}]

    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState(sampleData)

    useEffect(() => {
        let pantryContent = content.map((item) => {
            return item.ingredientName;
        }).join("+");

        const searchURL = `${hostName}/api/v1/recipe/by-ingredients/${pantryContent}`;
        getFetchWithAuth(searchURL, (jsonData) => {
            setRecipes(jsonData);
            setLoading(false)
        }, (error) => {
            console.log(error)
        })
    }, [content, setContent])

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