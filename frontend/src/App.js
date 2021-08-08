import {Route, Switch} from 'react-router-dom';

import Home from "./pages/Home";
import Register from "./pages/Register";
import Layout from "./components/layout/Layout";

import './App.module.css';
import Favorites from "./pages/Favorites";

function App() {
    return (
        <Layout>
            <Switch>
                <Route path='/' exact>
                    <Home />
                </Route>
                <Route path='/register'>
                    <Register/>
                </Route>
                <Route path='/favorites'>
                    <Favorites/>
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;
