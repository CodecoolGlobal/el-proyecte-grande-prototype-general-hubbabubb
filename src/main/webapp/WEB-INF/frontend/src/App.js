import {Route, Switch} from 'react-router-dom';

import Home from "./pages/Home";
import Register from "./pages/Register";
import Layout from "./components/layout/Layout";

import LoginForm from "./components/login/LoginForm";
import {GroceryList} from './pages/GroceryList';
import {Pantry} from './pages/Pantry';
import RecipeList from './recipe/RecipeList';
import Recipe from './components/Recipe';

import {FromMyPantry} from './pages/FromMyPantry';
import MealPlan from './pages/MealPlan';
import Login from './Login';


function App() {

    return (
        <Layout>
            <Switch>
                <Route path='/' exact>
                    <Home/>
                </Route>
                <Route path="/grocery-list">
                    <GroceryList/>
                </Route>
                <Route path="/register">
                    <Register/>
                </Route>
                <Route path="/pantry">
                    <Pantry/>
                </Route>
                <Route path="/from-my-pantry">
                    <FromMyPantry/>
                </Route>
                <Route path='/meal-plan'>
                    <MealPlan/>
                </Route>
                <Route path="/login">
                        <Login/>
                </Route>
                <Route path="/search-recipe">
                    <RecipeList/>
                </Route>
                <Route path="/recipe/:id">
                    <Recipe/>
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;
