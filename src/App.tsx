import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import LoginScreen from './components/LoginScreen';
import axios from 'axios';

function App() {

    const [authToken, setAuthToken] = useState(
        localStorage.getItem('@token')
    );

    axios.defaults.headers.common['Authorization'] = authToken;

    if (!authToken?.length) {
        return (
                <LoginScreen setAuthToken={setAuthToken} />
        );
    }

}

export default App;
