import { TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type UserLogin = {
    username: string;
    password: string;
};
export default function LoginScreen() {
    const [user, setUser] = useState<UserLogin>({
        username: '',
        password: ''
    });

    const { register, handleSubmit } = useForm<UserLogin>();

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
                <Button variant="contained" type="submit" size="large" onClick={handleSubmit((user) => setUser(user))}>
                    Contained
                </Button>
            </form>
        </div>
    );
}
