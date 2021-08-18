import {useContext} from "react";
import FavoritesContext from "../store/favorites-context";
import RecipeList from '../recipe/RecipeList'

// TODO: This stores favorites ONLY in memory!
function Favorites() {
    let favoritesContext = useContext(FavoritesContext);

    let content;
    if (favoritesContext.totalFavorites === 0) {
        content = <p>No favorites yet! Let's start to add some ;)</p>
    } else {
        content = <RecipeList recipes={favoritesContext.favorites}/>;
    }

    return <section>
        <h1>My Favorites</h1>
        {content}
    </section>
}

export default Favorites;