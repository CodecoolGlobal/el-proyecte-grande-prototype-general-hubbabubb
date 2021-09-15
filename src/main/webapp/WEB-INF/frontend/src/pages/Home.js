import React, {useEffect} from 'react';
import './Home.css';
import logo from '../components/pantry_art.png';
import axios from 'axios';

function Home() {

    const authToken = (token) => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `${token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    };

    useEffect(() => {
            authToken(localStorage.jwtToken);
        }
    )
    // const auth = useSelector((state) => console.log(state));
    return <div className={'App'}>
        <div className={'App-header'}>
            <h1>
                Welcome in your Pantry!
            </h1>
            <img src={logo} alt={'logo'} className="App-logo"/>
        </div>
    </div>
}

export default Home;