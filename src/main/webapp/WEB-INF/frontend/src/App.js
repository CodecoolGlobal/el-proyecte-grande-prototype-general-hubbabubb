import {Route, Switch} from 'react-router-dom';

import Layout from "./layout/Layout";
import {GroceryList} from './pages/GroceryList';
import Pantry from './pages/Pantry';

import {RecipesFromPantry} from './pages/RecipesFromPantry';
import MealPlan from './pages/MealPlan';
import LoginRegister from "./pages/LoginRegister";
import RecipesByName from "./pages/RecipesByName";
import {useState} from "react";
import {SearchInput} from "./store/recipe-search-input";


function App(props) {
    const [searchField, setSearchField] = useState();

    const values = {searchField, setSearchField};

    return (
        <SearchInput.Provider value={values}>
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
                        <RecipesByName />
                    </Route>
                    <Route path="/from-my-pantry">
                        <RecipesFromPantry/>
                    </Route>
                </Switch>
            </Layout>
        </SearchInput.Provider>
    );
}

export default App;
