import { Button } from '@mui/material';
import React from 'react';
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

type Errors = {
    error: boolean;
    message: string;
};

const CageWindow = ({ open, setOpen }: CageWindoProps) => {
    const { register, handleSubmit, reset } = useForm<Cage>();
    const [errorDescricao, setErrorDescricao] = React.useState<Errors>({
        error: false,
        message: ''
    });
    const [errorDiametro, setErrorDiametro] = React.useState<Errors>({
        error: false,
        message: ''
    });

    const handleCreateCage = async (cage: Cage) => {
        if (!cage.descricao.length) {
            setErrorDescricao({
                error: true,
                message: 'A descrição não pode ser vazia!'
            });
            return;
        }

        setErrorDescricao({
            error: false,
            message: ''
        });

        if (!cage.diametro || parseInt(cage.diametro.toString()) <= 0) {
            setErrorDiametro({
                error: true,
                message: 'O diâmetro da roda deve ser maior que zero!'
            });
            return;
        }

        setErrorDiametro({
            error: false,
            message: ''
        });

        try {
            await axios.post('Cage', cage);
            toast.success('Gaiola cadastrada com sucesso!');
            reset({
                descricao: '',
                diametro: 0
            });
        } catch (error) {
            toast.error('Erro ao cadastrar gaiola!');
        }
    };

    const handleClose = () => {
        setOpen(false);
        reset({
            descricao: '',
            diametro: 0
        });
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
                    error={errorDescricao.error}
                    helperText={errorDescricao.message}
                    margin="normal"
                    {...register('descricao')}
                />
                <TextField
                    autoFocus
                    label="Diâmetro da roda (cm)"
                    type="number"
                    fullWidth
                    error={errorDiametro.error}
                    helperText={errorDiametro.message}
                    margin="normal"
                    InputProps={{ inputProps: { min: 0 } }}
                    {...register('diametro')}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleClose()}
                    endIcon={<CloseIcon />}
                >
                    Fechar
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
