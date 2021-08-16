import Ingredient from "./Ingredient";
import {Button} from 'react-bootstrap';
import { useContext } from 'react';
import FavoritesContext from "../store/favorites-context";

function Recipe(props) {
    let favoritesContext = useContext(FavoritesContext);
    let isFavorite = favoritesContext.isFavorite(props.id);

    function toggleFavorites() {
        if (isFavorite) {
            favoritesContext.removeFavorite(props.id)
        } else {
            favoritesContext.addFavorite({
                id: props.id,
                name: props.name,
                ingredients: props.ingredients
            })
        }
    }

    return <div>
        <h2>{props.recipe.name}</h2>
        <h3>Ingredients:</h3>
        <Ingredient ingredients={props.recipe.ingredients} />
        <Button onClick={toggleFavorites}>{isFavorite ? 'Remove Favorites' : 'Add to Favorites'}</Button>
    </div>
}

export default Recipe;