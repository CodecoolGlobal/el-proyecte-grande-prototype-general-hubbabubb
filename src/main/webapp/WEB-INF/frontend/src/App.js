import {Route, Switch} from 'react-router-dom';

import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import {GroceryList} from './pages/GroceryList';
import {Pantry} from './pages/Pantry';

import {FromMyPantry} from './pages/FromMyPantry';
import MealPlan from './pages/MealPlan';
import LoginRegister from "./pages/LoginRegister";
import RecipesByName from "./pages/RecipesByName";
import {useState} from "react";
import {SearchInput} from "./store/recipe-search-input";


function App() {
    const [searchField, setSearchField] = useState();

    const values = {searchField, setSearchField};

    return (
        <SearchInput.Provider value={values}>
            <Layout>
                <Switch>
                    <Route path="/" exact>
                        <Home/>
                    </Route>
                    <Route path="/login">
                        <LoginRegister active={"login"}/>
                    </Route>
                    <Route path="/register">
                        <LoginRegister active={"register"}/>
                    </Route>
                    <Route path="/pantry">
                        <Pantry/>
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
                        <FromMyPantry/>
                    </Route>
                </Switch>
            </Layout>
        </SearchInput.Provider>
    );
}

export default App;
