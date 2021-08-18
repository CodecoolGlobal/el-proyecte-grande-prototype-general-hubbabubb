import React from 'react';
import './Home.css';
import logo from '../components/pantry_art.png';

function Home() {
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