import React from "react";
import styled from 'styled-components';
import RecipeListItem from "./RecipeListItem";
import {Grid} from "@material-ui/core";

const RecipeTable = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

function RecipeList(props) {

    return <RecipeTable>
        {props.recipes.map((recipe) => {
            return <Grid>
                <RecipeListItem title={recipe.title} id={recipe.id} image={recipe.image} />
            </Grid>
        })}
    </RecipeTable>

}

export default RecipeList;