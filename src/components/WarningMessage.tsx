import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';


const WarningMessage = () => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" component="div">
                    Alerta: Alguma gaiola não está funcionando!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Verifique e resolva o problema o mais rápido possível.
                </Typography>
            </CardContent>
        </Card>
    );
};

export default WarningMessage;
