import Recipe from "./Recipe";

function RecipeList(props) {
    return <ul>
        {props.recipes.map((recipe) => {
            <Recipe
                key={recipe.id}
                id={recipe.id}
                name={recipe.name}
                ingredients={recipe.ingredients}
            />
        })}
    </ul>
}

export default RecipeList;