import axios from 'axios';
import '../css/GraphicExample.css';
import { SyntheticEvent, useState } from 'react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Bar,
    BarChart,
    Brush
} from 'recharts';
import { Button, TextField, Typography } from '@mui/material';
import CardInfo from './CardInfo';

export default function GraphicExample() {
    const [initialDate, setInitialDate] = useState('');
    const [finalDate, setFinalDate] = useState('');
    const [graphData, setGraphData] = useState([]);

    async function getData() {
        try {
            const response = await axios.get(
                `Turns/${initialDate}/${finalDate}`
            );
            setGraphData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();
        getData();
    };

    return (
        <div>
            <div style={{ display: 'flex', gap: '5px' }}>
                <CardInfo title="Distância percorrida" value="10 KM" />
                <CardInfo title="Velocidade média" value="10 KM/H" />
                <CardInfo title="Tempo total percorrido" value="1 Hora" />
            </div>
            <form onSubmit={handleSubmit}>
                <Typography>Data inicial:</Typography>
                <TextField
                    type="date"
                    value={initialDate}
                    onChange={(e) => setInitialDate(e.target.value)}
                />
                <Typography>Data final:</Typography>
                <TextField
                    type="date"
                    value={finalDate}
                    onChange={(e) => setFinalDate(e.target.value)}
                />
                <Button variant="contained" type="submit">
                    Fetch Data
                </Button>
            </form>
            <BarChart
                width={700}
                height={400}
                data={graphData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="distanciaPercorrida" fill="#8884d8" />
                <Bar dataKey="velocidadeMedia" fill="#82ca9d" />
                <Brush dataKey="data" height={30} stroke="#8884d8" />{' '}
            </BarChart>
        </div>
    );
}
