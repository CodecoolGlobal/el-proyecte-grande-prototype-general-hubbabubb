import {Route, Switch} from 'react-router-dom';

import Home from "./pages/Home";
import Register from "./pages/Register";
import Layout from "./components/layout/Layout";

import './App.module.css';
import Favorites from "./pages/Favorites";
import LoginForm from "./components/login/LoginForm";
import {GroceryList} from './pages/GroceryList';
import {Pantry} from './pages/Pantry';
import RecipeList from './recipe/RecipeList';
import Card from './components/Card';
import {FromMyPantry} from './pages/FromMyPantry';

function App() {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact>
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
                <Route path="/login">
                    <LoginForm/>
                </Route>
                <Route path="/search-recipe">
                    <RecipeList/>
                </Route>
                <Route path="/recipe/:id">
                    <Card/>
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;
