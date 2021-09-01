import React from "react";
import styled from 'styled-components';
import RecipeListItem from "./RecipeListItem";
import {Grid} from "@material-ui/core";

export const CardList = styled.div`

    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

function RecipeList(props) {

    return <CardList>
        {props.recipes.map((recipe) => {
            return <Grid key={recipe.id}>
                <RecipeListItem title={recipe.title} id={recipe.id} image={recipe.image} />
            </Grid>
        })}
    </CardList>

}

export default RecipeList;