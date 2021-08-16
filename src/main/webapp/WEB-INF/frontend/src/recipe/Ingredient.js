function Ingredient(props) {
    return <ul>
        {props.ingredients.map((ingredient => {
        return <li>{ingredient.quantity + ' ' + ingredient.name}</li>
        }))}
        </ul>
        }

export default Ingredient;