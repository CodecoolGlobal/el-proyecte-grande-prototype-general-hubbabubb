import { Route, Switch} from 'react-router-dom';

import Home from "./pages/Home";
import Register from "./pages/Register";
import Layout from "./components/layout/Layout";

import './App.module.css';
import Favorites from "./pages/Favorites";
import LoginForm from "./components/login/LoginForm";
import {GroceryList} from './pages/GroceryList';
import {Pantry} from './pages/Pantry';
import MealPlan from "./pages/MealPlan";

function App() {
    return (
        <Layout>
            <Switch>
                <Route path='/' exact>
                    <Home />
                </Route>
                <Route path='/grocery-list'>
                    <GroceryList/>
                </Route>
                <Route path='/register'>
                    <Register/>
                </Route>
                <Route path='/pantry'>
                    <Pantry/>
                </Route>
                <Route path='/login'>
                    <LoginForm/>
                </Route>
                <Route path='/favorites'>
                    <Favorites/>
                </Route>
                <Route path='/meal-plan'>
                    <MealPlan/>
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;
