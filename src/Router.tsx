import { Route, Routes } from 'react-router-dom';
import Cage from './pages/Cage';

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Cage />} />
        </Routes>
    );
}
