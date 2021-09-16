import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/user-context";
import {LinearProgress} from "@material-ui/core";
import {RecipesContainer} from "./RecipesByName";
import {LargeHeader} from "../components/Common";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSadCry} from "@fortawesome/free-regular-svg-icons";
import RecipeList from "../components/recipe/RecipeList";
import {faCrown} from "@fortawesome/free-solid-svg-icons/faCrown";

function Favorites() {
    const {userData, setUserData} = useContext(UserContext);
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(userData)
        setRecipes(userData.favorites);
        setLoading(false);
    }, [])

    if (loading) { return <LinearProgress variant={"query"} color={"primary"} />}

    if (recipes === undefined || recipes.length === 0) {
        return <RecipesContainer>
            <LargeHeader><FontAwesomeIcon icon={faSadCry}/> No recipes found! Start collect recipes.</LargeHeader>
        </RecipesContainer>
    }

    return <RecipesContainer>
        <LargeHeader><FontAwesomeIcon icon={faCrown}/> Favorite recipes:</LargeHeader>
        <RecipeList recipes={recipes} />
    </RecipesContainer>
}

export default Favorites;