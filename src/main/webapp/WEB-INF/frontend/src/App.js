import {Route, Switch} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

import Layout from "./layout/Layout";
import {GroceryList} from './pages/GroceryList';
import Pantry from './pages/Pantry';

import {RecipesFromPantry} from './pages/RecipesFromPantry';
import MealPlan from './pages/MealPlan';
import LoginRegister from "./pages/LoginRegister";
import RecipesByName from "./pages/RecipesByName";
import {useEffect, useState} from "react";
import {SearchInput} from "./context/recipe-search-input";
import {UserContext} from "./context/user-context";
import AuthenticationService from "./util/AuthenticationService";
import Favorites from "./pages/Favorites";
import {getFetch} from "./util/fetchData";


function App() {
    const [searchField, setSearchField] = useState();
    const [userData, setUserData] = useState({
        isLoggedIn: AuthenticationService.isUserLoggedIn(),
        favorites: [],
        totalFavorites: 0
    })

    useEffect(() => {
        getFetch(`/api/v1/appuser/favorites/${AuthenticationService.getLoggedInUserName()}`, (favorites) => {
            setUserData({
                isLoggedIn: AuthenticationService.isUserLoggedIn,
                favorites: favorites,
                totalFavorites: favorites.length
            })
        }, (err) => console.error(err))
    }, [])

    const inputValues = {searchField, setSearchField};
    const userValues = {userData, setUserData};

    return (
        <UserContext.Provider value={userValues}>
            <SearchInput.Provider value={inputValues}>
                <Layout>
                    <Switch>
                        <Route path="/" exact>
                            <LoginRegister active={"login"}/>
                        </Route>
                        <Route path="/pantry">
                            <Pantry/>
                        </Route>
                        <Route path="/register">
                            <LoginRegister active={"register"}/>
                        </Route>
                        <Route path="/grocery-list">
                            <GroceryList/>
                        </Route>
                        <Route path="/meal-plan">
                            <MealPlan/>
                        </Route>
                        <Route path="/search-recipe">
                            <RecipesByName/>
                        </Route>
                        <Route path="/from-my-pantry">
                            <RecipesFromPantry/>
                        </Route>
                        <Route path="/favorites">
                            <Favorites/>
                        </Route>
                    </Switch>
                </Layout>
            </SearchInput.Provider>
        </UserContext.Provider>
    );
}

export default withRouter(App);
