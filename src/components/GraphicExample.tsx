import React from 'react';
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
import { Cage } from '../types/Cage';
import SelectItems from '../types/SelectItems';
import { ReactNode } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import MenuItem from '@mui/material/MenuItem';
import toast from 'react-hot-toast';
export default function GraphicExample() {
    const [initialDate, setInitialDate] = useState('');
    const [finalDate, setFinalDate] = useState('');
    const [graphData, setGraphData] = useState([]);
    const [selectCages, setSelectCages] = useState<SelectItems[]>([]);
    const [cageId, setCageId] = useState<string>();
    const [distanciaPercorrida, setDistanciaPercorrida] = useState<string>('');
    const [velocidadeMedia, setVelocidadeMedia] = useState<string>('');
    const [tempoTotalPercorrido, setTempoTotalPercorrido] =
        useState<string>('');

    React.useEffect(() => {
        getAllCages();
    }, []);

    async function getData() {
        try {
            if (!cageId || !initialDate || !finalDate) {
                toast.error('Preencha todos os campos para filtrar!');
                return;
            }
            const response = await axios.get(
                `Turns/DashBoard/${cageId}?dataI=${initialDate}&dataE=${finalDate}`
            );

            setGraphData(response.data.medias);
            setDistanciaPercorrida(response.data.distanciaPercorridaTotal);
            setVelocidadeMedia(response.data.velocidadeTotal);
            setTempoTotalPercorrido(response.data.tempoDeAtividadeTotal);
            toast.success('Gaiolas filtradas com sucesso!');
        } catch (error) {
            toast.error('Não foram encontrados dados para o filtro!');
        }
    }

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();
        getData();
    };

    const getAllCages = async () => {
        try {
            const response = await axios.get<Cage[]>('Cage');

            const data = response.data.map((cage: Cage) => ({
                id: cage.id,
                value: cage.descricao
            }));

            setSelectCages(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (
        event: SelectChangeEvent<unknown>,
        child: ReactNode
    ) => {
        setCageId(event.target.value as string);
    };

    return (
        <div style={{ width: '100%', height: '60vh' }}>
            <div className="container-cards">
                <CardInfo
                    title="Distância percorrida"
                    value={distanciaPercorrida}
                />
                <CardInfo title="Velocidade média" value={velocidadeMedia} />
                <CardInfo
                    title="Tempo total percorrido"
                    value={tempoTotalPercorrido}
                />
            </div>
            <div className="container-filtro">
                <div className="container-data">
                    <form onSubmit={handleSubmit}>
                        <Typography>Gaiola</Typography>
                        <Select
                            disabled={!selectCages.length}
                            onChange={handleChange}
                            value={cageId || ''}
                        >
                            {selectCages.map((item: SelectItems) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.value}
                                </MenuItem>
                            ))}
                        </Select>
                        <Typography>Data inicial</Typography>
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
                    <Brush dataKey="data" height={30} stroke="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
