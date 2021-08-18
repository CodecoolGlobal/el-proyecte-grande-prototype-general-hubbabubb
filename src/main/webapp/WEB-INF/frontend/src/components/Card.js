import React, {useEffect, useState} from 'react';


function Card(props) {
    let id = props.id;
    const recipeUrl = `http://localhost:8080/api/v1/recipe/${id}`
    const [recipe, setRecipe] = useState({id: 58987797, title: "Loading...", image: ""})
    const getRecipe = () => {
        fetch(
            recipeUrl).then(res => res.json()).then(json => setRecipe(json));
    }

    useEffect(() => getRecipe(), [setRecipe])

    return (

        <div className="card_container">
            <div className="card">
                <div className="card">
                    <img className="card_img" src={recipe.image} alt="recepie-pic"/>
                    <h2 className="card_title">{recipe.title}</h2>
                    <table>
                        <tr>Vegetarian : {recipe.vegetarian === "true" ? "True" : "False"}</tr>
                        <tr>Vegan : {recipe.vegan === "true" ? "True" : "False"}</tr>
                        <tr>GlutenFree : {recipe.glutenFree ==="true" ? "True" : "False"}</tr>
                    </table>
                </div>
                {/*<div>*/}
                {/*  <IngredientList recepie={recipe} />*/}
                {/*</div>*/}
                <div
                    dangerouslySetInnerHTML={{__html: recipe.instructions}}
                    className="creation_paragraph"
                />
                <div className="btn_container">
                    <button className="card_btn">Add To Meal Plan</button>
                    <button className="card_btn">Add To Grocery List</button>
                </div>
            </div>
        </div>
    );
}

export default Card;
