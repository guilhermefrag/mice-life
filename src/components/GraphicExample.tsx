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
    Brush,
    ResponsiveContainer
} from 'recharts';
import { Button, TextField, Typography } from '@mui/material';
import CardInfo from './CardInfo';
import SearchIcon from '@mui/icons-material/Search';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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
        <div style={{ width: '100%', height: '60vh' }}>
            <h2>Gaiola 1</h2>
            <div className="container-cards">
                <CardInfo title="Distância percorrida" value="10 KM" />
                <CardInfo title="Velocidade média" value="10 KM/H" />
                <CardInfo title="Tempo total percorrido" value="1 Hora" />
            </div>
            <div className="container-filtro">
                <div className="container-data">
                    <form onSubmit={handleSubmit}>
                        <Typography>Periodo</Typography>
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
                        <Button
                            variant="contained"
                            size="large"
                            type="submit"
                            endIcon={<SearchIcon />}
                        >
                            Pesquisar
                        </Button>
                    </form>
                </div>
            </div>
            <ResponsiveContainer width="100%">
                <BarChart
                    width={900}
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
            </ResponsiveContainer>
        </div>
    );
}
