import { Route, Routes } from 'react-router-dom';
import Cage from './pages/Cage';
import GraphicExample from './components/GraphicExample';

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Cage />} />
            <Route path="/graphic" element={<GraphicExample />} />
        </Routes>
    );
}
