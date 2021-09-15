import {createContext, useState} from 'react';

const FavoritesContext = createContext({
    favorites: [],
    totalFavorites: 0,
    addFavorite: (recipe) => {},
    removeFavorite: (recipeId) => {},
    isFavorite: (recipeId) => {},
});

export function FavoritesContextProvider(props) {
    const [userFavorites, setUserFavorite] = useState([])

    //TODO: CRUD database functions implement
    function addFavorite(recipe) {
        setUserFavorite((prevFavorites) => {
            return prevFavorites.concat(recipe);
        });
    }

    function removeFavorite(recipeId) {
        setUserFavorite((prevFavorites) => {
            return prevFavorites.filter(recipe => recipe.id !== recipeId);
        })
    }

    function isFavorite(recipeId) {
        return userFavorites.some(recipe => recipe.id === recipeId)
    }

    const context = {
        favorites: userFavorites,
        totalFavorites: userFavorites.length,
        addFavorite: addFavorite,
        removeFavorite: removeFavorite,
        isFavorite: isFavorite
    };

    return <FavoritesContext.Provider value={context}>
        {props.children}
    </FavoritesContext.Provider>
}

export default FavoritesContext;