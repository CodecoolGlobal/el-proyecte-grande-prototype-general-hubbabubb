import React, {useEffect, useState} from 'react';
import {Button} from '@material-ui/core';


function Recipe(props) {
    let id = props.id;
    const recipeUrl = `http://localhost:8080/api/v1/recipe/${id}`
    const myHeaders = new Headers();
    myHeaders.append('Authorization', localStorage.jwtToken);
    const [recipe, setRecipe] = useState({id: 58987797, title: "Loading...", image: ""})
    const getRecipe = () => {
        fetch(
            recipeUrl,{method: 'GET', headers: myHeaders}).then(res => res.json()).then(json => setRecipe(json));
    }

    useEffect(() => {getRecipe()}, [recipe])

    return (

        <div className="card_container">
            <div className="card">
                <div className="card">
                    <img className="card_img" src={recipe.image} alt="Recipe picture"/>
                    <h2 className="card_title">{recipe.title}</h2>
                    <table>
                        <tr>Vegetarian : {recipe.vegetarian === "true" ? "True" : "False"}</tr>
                        <tr>Vegan : {recipe.vegan === "true" ? "True" : "False"}</tr>
                        <tr>GlutenFree : {recipe.glutenFree ==="true" ? "True" : "False"}</tr>
                    </table>
                </div>
                {/*<div>*/}
                {/*  <IngredientList recipe={recipe} />*/}
                {/*</div>*/}
                <div
                    dangerouslySetInnerHTML={{__html: recipe.instructions}}
                    className="creation_paragraph"
                />
                <div className="btn_container">
                    <Button color={"primary"} className="card_btn">Add To Meal Plan</Button>
                    <Button color={"secondary"} className="card_btn">Add To Grocery List</Button>
                </div>
            </div>
        </div>
    );
}

export default Recipe;
