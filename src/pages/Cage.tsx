import * as React from 'react';
import CageTable from '../components/CageTable';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CageWindow from '../components/CageWindow';
import axios from 'axios';
import { Cage as CageType } from '../types/Cage';
import SearchIcon from '@mui/icons-material/Search';

const Cage = () => {
    const [open, setOpen] = React.useState(false);
    const [cages, setCages] = React.useState<CageType[] | []>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [mustReload, setMustReload] = React.useState(false);

    React.useEffect(() => {
        getAllCages();
    }, []);

    React.useEffect(() => {
        if (mustReload) {
            getAllCages();
            setMustReload(false);
        }
    }, [mustReload]);

    const getAllCages = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get('Cage');

            setCages(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ flex: 1 }}>
            <Button
                variant="contained"
                type="submit"
                style={{ background: '#b9b9b9f7' }}
                size="large"
                onClick={() => getAllCages()}
                endIcon={<SearchIcon />}
            >
                Pesquisar
            </Button>
            &nbsp;
            <Button
                variant="contained"
                type="submit"
                style={{ background: '#b9b9b9f7' }}
                size="large"
                onClick={() => setOpen(true)}
                endIcon={<AddIcon />}
            >
                Novo
            </Button>
            <CageWindow open={open} setOpen={setOpen} />
            <CageTable
                cages={cages}
                isLoading={isLoading}
                setMustReload={setMustReload}
            />
        </div>
    );
};

export default Cage;
