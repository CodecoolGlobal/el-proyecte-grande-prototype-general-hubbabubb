import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {FavoritesContextProvider} from "./store/favorites-context";
import {Provider} from 'react-cookie/es6/CookiesContext';

ReactDOM.render(
    <React.StrictMode>
        <FavoritesContextProvider>

            <Provider value={"auth"}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        </FavoritesContextProvider>
    </React.StrictMode>,
    document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
