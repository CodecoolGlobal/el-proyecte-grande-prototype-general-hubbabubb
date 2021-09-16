import React, {useContext, useEffect, useState} from "react";
import {SearchInput} from "../context/recipe-search-input";
import RecipeList from "../components/recipe/RecipeList";
import {hostName} from "../util/constants";
import {getFetchWithAuth} from "../util/fetchData";
import styled from "styled-components";
import {LargeHeader} from "../components/Common";
import {faSearch,} from "@fortawesome/free-solid-svg-icons";
import {faSadCry} from "@fortawesome/free-regular-svg-icons";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {LinearProgress} from '@material-ui/core';

export const RecipesContainer = styled.div`
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export default function RecipesByName() {
    const {searchField} = useContext(SearchInput);
    const [loading, setLoading] = useState(true)
    const [recipes, setRecipes] = useState("")

    useEffect(() => {
        const searchURL = `${hostName}/api/v1/recipe/search/${searchField}`;
        getFetchWithAuth(searchURL, (jsonData) => {
            setRecipes(jsonData);setLoading(false)
        }, (error) => {
            console.log(error)
        })
    }, [searchField])

    if (loading) { return <LinearProgress variant={"query"} color={"primary"} />
    }

    if (recipes === "" || recipes.results.length === 0) {
        return <RecipesContainer>
            <LargeHeader><FontAwesomeIcon icon={faSadCry}/> No recipes found!</LargeHeader>
        </RecipesContainer>
    }

    return <RecipesContainer>
        <LargeHeader><FontAwesomeIcon icon={faSearch}/> Search results:</LargeHeader>
        <RecipeList recipes={recipes.results}/>
    </RecipesContainer>
}