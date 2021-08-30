import {Route, Switch} from 'react-router-dom';

import Home from "./pages/Home";
import Layout from "./components/layout/Layout";
import {GroceryList} from './pages/GroceryList';
import {Pantry} from './pages/Pantry';

import RecipeList from './recipe/RecipeList';

import {FromMyPantry} from './pages/FromMyPantry';
import MealPlan from './pages/MealPlan';
import LoginRegister from "./pages/LoginRegister";

function App() {
    return (
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
                    <RecipeList/>
                </Route>
                <Route path="/from-my-pantry">
                    <FromMyPantry/>
                </Route>
                <Route path='/meal-plan'>
                    <MealPlan/>
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;
