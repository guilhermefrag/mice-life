import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';


type Props = {
    mensagemGaiolas: string;
}

const WarningMessage = ({ mensagemGaiolas }: Props) => {
    return (
        <Card style={{
            margin: '0 0 0 5',
            background: 'none',
            boxShadow: 'none'
        }}>
            <CardContent style={{
                padding: 0
            }}>
                <Typography variant="h6" component="div">
                    <div style={{ margin: 0, padding: 0, color: '#d32f2f' }}> Atenção,</div>
                    {`As gaiolas ${mensagemGaiolas} não tiveram atividades em pelo menos 1 dia`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Verifique e resolva o problema o mais rápido possível.
                </Typography>
            </CardContent>
        </Card >
    );
};

export default WarningMessage;
