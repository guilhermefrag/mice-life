import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../css/LoginScreen.css'

import Rato from '../img/rato2.jpg'

type UserLogin = {
    username: string;
    password: string;
};

type LoginScreenProps = {
    setAuthToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function LoginScreen({ setAuthToken }: LoginScreenProps) {
    const [user, setUser] = useState<UserLogin | null>(null);

    const { register, handleSubmit } = useForm<UserLogin>();

    const handleLogin = async (user: UserLogin) => {
        setUser(user);
        // const response = await axios.post(
        //     'http://localhost:8000/api/login',
        //     user
        // );
        if (user.username === 'admin' && user.password === 'admin') {
            const token = 'X';
            localStorage.setItem('@token', token);
            setAuthToken(token);
            axios.defaults.headers.common['Authorization'] = token;
        }
        
    };

    return (
        <div className='container-form'>
            <form action="" className="formulario-login">
                <img 
                src={Rato} 
                className='img-logo'
                />
                <TextField
                    label="Username"
                    variant="outlined"
                    className='input-text'
                    {...register('username')}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type='password'
                    className='input-text'
                    {...register('password')}
                />
                <Button
                    variant="contained"
                    type="submit"
                    style={{background:'#b9b9b9f7'}}
                    size="large"
                    onClick={handleSubmit((user) => handleLogin(user))}
                >
                    Login
                </Button>
            </form>
        </div>
    );
}
