import axios from 'axios';
import '../css/GraphicExample.css';
import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100
    }
];

export default function GraphicExample() {
    let turnsData;
    async function getData() {
        try {
            const response = await axios.get('Turns');
            turnsData = response.data;
            console.log(turnsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    getData();
    
    const graphData = [
        {
            data: '0001-01-01T00:00:00',
            distanciaPercorrida: 0,
            gaiolaId: 1,
            tempoAtividade: 0,
            velocidadeMedia: 0
        },
        {
            data: '2023-09-12T00:31:00',
            distanciaPercorrida: 12.5,
            gaiolaId: 1,
            tempoAtividade: 120,
            velocidadeMedia: 120
        }
    ];
    return (
        <LineChart
            width={700}
            height={600}
            data={graphData}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="distanciaPercorrida" />
            <YAxis dataKey="velocidadeMedia" />
            <Tooltip />
            <Legend />
            <Line
                type="monotone"
                dataKey="distanciaPercorrida"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="velocidadeMedia" stroke="#82ca9d" />
        </LineChart>
    );
}
