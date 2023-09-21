import { TextField, Button, Alert, AlertTitle } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../css/LoginScreen.css';

import Rato from '../img/rato2.jpg';

import toast, { Toaster } from 'react-hot-toast';

type UserLogin = {
    userName: string;
    password: string;
};

type LoginScreenProps = {
    setAuthToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function LoginScreen({ setAuthToken }: LoginScreenProps) {
    const { register, handleSubmit } = useForm<UserLogin>();
    const [errorUserName, setErrorUserName] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);

    const handleLogin = async (user: UserLogin) => {
        try {
            if (!user.userName.length) {
                setErrorUserName(true);
                return;
            }
            setErrorUserName(false);

            if (!user.password.length) {
                setErrorPassword(true);
                return;
            }
            setErrorPassword(false);

            const response = await axios.post(`Auth`, user);

            const token = response.data.token.token;

            toast.success('Login efetuado com sucesso!');

            localStorage.setItem('@token', token);
            localStorage.setItem('@username', user.userName);

            setAuthToken(token);

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error) {
            toast.error('Usuário ou senha inválidos!');
        }
    };

    return (
        <div className="container-form">
            <form action="" className="formulario-login">
                <img src={Rato} className="img-logo" />
                <TextField
                    label="Username"
                    variant="outlined"
                    error={errorUserName}
                    className="input-text"
                    {...register('userName')}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    error={errorPassword}
                    type="password"
                    className="input-text"
                    {...register('password')}
                />
                <Button
                    variant="contained"
                    type="submit"
                    style={{ background: '#b9b9b9f7' }}
                    size="large"
                    endIcon={<LoginIcon />}
                    onClick={handleSubmit((user) => handleLogin(user))}
                >
                    Entrar
                </Button>
            </form>
            <Toaster />
        </div>
    );
}
