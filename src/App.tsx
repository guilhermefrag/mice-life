import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './App.css';
import LoginScreen from './components/LoginScreen';
import axios from 'axios';
import Router from './Router';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

function App() {
    const [authToken, setAuthToken] = useState(localStorage.getItem('@token'));

    axios.defaults.headers.common['Authorization'] = authToken;
    axios.defaults.baseURL = 'http://172.22.44.76:8080/api/';
    // 'https://projetointegradorr.azurewebsites.net/api/';

    if (!authToken?.length) {
        return (
            <>
                <LoginScreen setAuthToken={setAuthToken} />
            </>
        );
    }

    return (
        <BrowserRouter>
            <section className="app-body">
                <div className="container-sidebar">
                    <Sidebar />
                </div>
                <Toaster />
                <div className="container-route">
                    <Header />
                    <Router />
                </div>
            </section>
        </BrowserRouter>
    );
}

export default App;
