import React from "react";
import styled from 'styled-components';

const RecipesContainer = styled.div`
    text-align: center;
`;

const RecipeTable = styled.table`
    width: 100%;
`;

function RecipeList(props) {
    if (props.recipes === null) {
        return <RecipesContainer>
            <h1>No recipes found!</h1>
        </RecipesContainer>
    }

    return <RecipesContainer>
        <RecipeTable>
            <h1>Search results:</h1>
            <tr>
                {props.recipes.map((recipe) => {
                    return <td><img src={recipe.image}  alt={recipe.title}/> {recipe.title} </td>
                })}
            </tr>
        </RecipeTable>
    </RecipesContainer>

}

export default RecipeList;