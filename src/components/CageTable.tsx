import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Cage } from '../types/Cage';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9)
];

type CageTableProps = {
    cages: Cage[] | [];
};

const CageTable = ({ cages }: CageTableProps) => {
    if (!cages.length!) {
        return <div>Não há gaiolas cadastradas!</div>;
    }

    return (
        <TableContainer component={Paper}>
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
                                <DeleteIcon />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CageTable;
