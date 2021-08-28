import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {FavoritesContextProvider} from "./store/favorites-context";
import {Provider} from 'react-cookie/es6/CookiesContext';

/*fetch("http://localhost:8080/api/v1/user")
    .then(data => data.json())
    .then(userData => {
        /!*        if (userData.pantry != null) {
                    ReactDOM.render(
                        <React.StrictMode>
                            <FavoritesContextProvider>
                                <BrowserRouter>
                                    <App/>
                                </BrowserRouter>
                            </FavoritesContextProvider>
                        </React.StrictMode>,
                        document.getElementById('root')
                    );
                } else {
                    ReactDOM.render(
                        <React.StrictMode>
                            <AddPantry />
                        </React.StrictMode>,
                        document.getElementById('root')
                    );
                }
            })
            .catch(e => {
                    ReactDOM.render(
                        <React.StrictMode>
                            <Login/>
                        </React.StrictMode>,
                        document.getElementById('root')
                    );
                }
            )*!/
        console.log(userData);
    })*/

ReactDOM.render(
    <React.StrictMode>
        <FavoritesContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </FavoritesContextProvider>
    </React.StrictMode>,
    document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
