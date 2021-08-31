import React, {useContext, useEffect, useState} from "react";
import {SearchInput} from "../store/recipe-search-input";
import RecipeList from "../components/recipe/RecipeList";
import {hostName} from "../util/constants";
import {getFetch, getFetchWithAuth} from "../util/fetchData";
import styled from "styled-components";
import {LargeHeader} from "../components/Common";

const RecipesContainer = styled.div`
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export default function RecipesByName(props) {
    const {searchField} = useContext(SearchInput);
    const [recipes, setRecipes] = useState("")
    const searchURL = `${hostName}/api/v1/recipe/search/${searchField}`;

    useEffect(() => {
        getFetchWithAuth(searchURL, (jsonData) => {
            setRecipes(jsonData)
        }, (error) => {
            console.log(error)
        })
    }, [searchField])

    if (recipes === "" || recipes.results.length === 0) {
        return <RecipesContainer>
            <LargeHeader>No recipes found!</LargeHeader>
        </RecipesContainer>
    }

    return <RecipesContainer>
        <LargeHeader>Search results:</LargeHeader>
        <RecipeList recipes={recipes.results}/>
    </RecipesContainer>
}