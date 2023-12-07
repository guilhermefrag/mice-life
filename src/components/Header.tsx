import axios from "axios";
import { useEffect, useState } from 'react';

import WarningMessage from "./WarningMessage";

const Header = () => {
    setTimeout(() => {
        getLastRecords();
    }, 3600000);
    const [mensagem, setMensagem] = useState('');
    const [gaiolasComErro, setGaiolasComErro] = useState(false);

    const getLastRecords = async () => {
        try {
            const response = await axios.get('Cage/GetCagesLastRecord');
            const datasInvalidas = response.data.filter((p: any) => diferencaDias(new Date(p.ultimoRegistro), new Date()) > 0);
            const gaiolas = datasInvalidas.map((p: any) => p.descricao);

            setGaiolasComErro(datasInvalidas.length > 0);

            setMensagem(gaiolas.join(', '));
        } catch (error) {
            console.log(error)
        }
    };

    const diferencaDias = (dataInicial: Date, dataFinal: Date) => {
        const utc1 = Date.UTC(dataInicial.getFullYear(), dataInicial.getMonth(), dataInicial.getDate());
        const utc2 = Date.UTC(dataFinal.getFullYear(), dataFinal.getMonth(), dataFinal.getDate());

        return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
    };

    return (
        <>
            {
                gaiolasComErro && <div style={{ marginBottom: '16px' }}>
                    <WarningMessage mensagemGaiolas={mensagem} />
                </div>
            }
            <div className="header">
                <h2>Bem vindo, {localStorage.getItem("@username")}</h2>
            </div>
        </>
    );
};

export default Header;
