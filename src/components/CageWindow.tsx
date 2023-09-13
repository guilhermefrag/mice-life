import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogProps,
    DialogTitle,
    TextField
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { Cage } from '../types/Cage';
import { toast } from 'react-hot-toast';
import axios from 'axios';

interface CageWindoProps extends DialogProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CageWindow = ({ open, setOpen }: CageWindoProps) => {
    const { register, handleSubmit, reset } = useForm<Cage>();

    const handleCreateCage = async (cage: Cage) => {
        try {
            const reponse = await axios.post('Cage', cage);
            toast.success('Gaiola cadastrada com sucesso!');
            reset();
        } catch (error) {
            toast.error('Erro ao cadastrar gaiola!');
        }
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    return (
        <Dialog open={open}>
            <DialogTitle>Gaiola</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    label="Descricao"
                    type="text"
                    fullWidth
                    margin="normal"
                    {...register('descricao')}
                />
                <TextField
                    autoFocus
                    label="Diâmetro (cm)"
                    type="number"
                    fullWidth
                    margin="normal"
                    min="0"
                    {...register('diametro')}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleClose()}
                    endIcon={<CloseIcon />}
                >
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleSubmit((cage) => handleCreateCage(cage))}
                    endIcon={<SaveIcon />}
                >
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CageWindow;
