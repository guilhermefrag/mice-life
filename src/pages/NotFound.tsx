import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

const NotFound = () => {
    return (
        <Typography>
            Ops... Essa página não existe
            <Link to="/"> Voltar aos Dashboards</Link>
        </Typography>
    );
};

export default NotFound;
