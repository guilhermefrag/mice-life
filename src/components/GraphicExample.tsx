import axios from 'axios';
import '../css/GraphicExample.css';
import { useState } from 'react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Bar,
    BarChart,
    Brush,
} from 'recharts';

export default function GraphicExample() {
    const [initialDate, setInitialDate] = useState('');
    const [finalDate, setFinalDate] = useState('');
    const [graphData, setGraphData] = useState([]);

    async function getData() {
        try {
            const response = await axios.get(`Turns/${initialDate}/${finalDate}`);
            setGraphData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        getData();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Initial Date:
                    <input
                        type="date"
                        value={initialDate}
                        onChange={(e) => setInitialDate(e.target.value)}
                    />
                </label>
                <label>
                    Final Date:
                    <input
                        type="date"
                        value={finalDate}
                        onChange={(e) => setFinalDate(e.target.value)}
                    />
                </label>
                <button type="submit">Fetch Data</button>
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
                <Brush dataKey="data" height={30} stroke="#8884d8" /> {/* Enable brushing */}
            </BarChart>
        </div>
    );
}
