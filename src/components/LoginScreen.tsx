import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

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
        const response = await axios.post(
            'http://localhost:8000/api/login',
            user
        );
        const token = 'X';
        localStorage.setItem('@token', token);
        setAuthToken(token);
        axios.defaults.headers.common['Authorization'] = token;
    };

    return (
        <div>
            <form action="">
                <TextField
                    label="Username"
                    variant="outlined"
                    {...register('username')}
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    {...register('password')}
                />
                <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    onClick={handleSubmit((user) => handleLogin(user))}
                >
                    Contained
                </Button>
            </form>
        </div>
    );
}
