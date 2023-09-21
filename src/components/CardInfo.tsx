import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type CardInfoProps = {
    title: string;
    value: string;
};

const CardInfo = ({ title, value }: CardInfoProps) => {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2">{value}</Typography>
            </CardContent>
        </Card>
    );
};

export default CardInfo;
