import { useState } from 'react';
import './App.css';
import LoginScreen from './components/LoginScreen';
import GraphicExample from './components/GraphicExample';
import axios from 'axios';

function App() {
    const [authToken, setAuthToken] = useState(localStorage.getItem('@token'));

    axios.defaults.headers.common['Authorization'] = authToken;
    axios.defaults.baseURL =
        'https://projetointegradorr.azurewebsites.net/api/';

    if (!authToken?.length) {
        return (
            <>
                <LoginScreen setAuthToken={setAuthToken} />
            </>
        );
    }

    return <GraphicExample />;
}

export default App;
