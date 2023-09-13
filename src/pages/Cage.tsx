import * as React from 'react';
import CageTable from '../components/CageTable';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CageWindow from '../components/CageWindow';
import axios from 'axios';
import { Cage as CageType } from '../types/Cage';

const Cage = () => {
    const [open, setOpen] = React.useState(false);
    const [cages, setCages] = React.useState<CageType[] | []>([]);

    React.useEffect(() => {
        getAllCages();
    }, []);

    const getAllCages = async () => {
        try {
            const response = await axios.get('Cage');
            
            setCages(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
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
            <CageTable cages={cages} />
        </div>
    );
};

export default Cage;
