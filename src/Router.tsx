import { Route, Routes } from 'react-router-dom';
import Cage from './pages/Cage';
import NotFound from './pages/NotFound';
import GraphicExample from './components/GraphicExample';

export default function Router() {
    return (
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<GraphicExample />} />
            <Route path="/cages" element={<Cage />} />
        </Routes>
    );
}
