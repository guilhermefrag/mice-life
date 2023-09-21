import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Cage } from '../types/Cage';
import { Typography } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import '../css/Cage.css';

type CageTableProps = {
    cages: Cage[] | [];
    isLoading: boolean;
    setMustReload: React.Dispatch<React.SetStateAction<boolean>>;
};

const CageTable = ({ cages, isLoading, setMustReload }: CageTableProps) => {
    if (isLoading)
        return (
            <Typography style={{ textAlign: 'center', marginTop: '10vh' }}>
                Carregando...
            </Typography>
        );

    if (!cages.length) {
        return (
            <Typography style={{ textAlign: 'center', marginTop: '10vh' }}>
                Não há gaiolas cadastradas!
            </Typography>
        );
    }

    const handleDeleteCage = async (id: number | undefined) => {
        if (!id) return;
        if (!window.confirm('Deseja realmente excluir essa gaiola?')) return;
        try {
            await axios.delete(`Cage/${id}`);

            toast.success('Gaiola excluída com sucesso!');

            setMustReload(true);
        } catch (error) {
            toast.error('Erro ao excluir gaiola!');
        }
    };

    return (
        <TableContainer component={Paper} className='container-table'>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Código</TableCell>
                        <TableCell align="right">Descrição</TableCell>
                        <TableCell align="right">Diâmetro&nbsp;(cm)</TableCell>
                        <TableCell align="right">Excluir</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cages.map((cage) => (
                        <TableRow
                            key={cage.id}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0
                                }
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {cage.id}
                            </TableCell>
                            <TableCell align="right">
                                {cage.descricao}
                            </TableCell>
                            <TableCell align="right">{cage.diametro}</TableCell>
                            <TableCell align="right">
                                <div onClick={() => handleDeleteCage(cage.id)}>
                                    <DeleteIcon
                                        color="error"
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CageTable;
