import React from 'react';
import '../css/Sidebar.css';
import Rato from '../img/rato.jpg';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AttractionsIcon from '@mui/icons-material/Attractions';
import { Link } from 'react-router-dom';
type SidebarDataProps = {
    id: number;
    title: string;
    path: string;
    icon: React.ReactElement;
};

const SidebarData: SidebarDataProps[] = [
    {
        id: 1,
        title: 'Dashboards',
        path: '/',
        icon: <LeaderboardIcon />
    },
    {
        id: 2,
        title: 'Gaiolas',
        path: '/cages',
        icon: <AttractionsIcon />
    }
];

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <img src={Rato} className="img-logo" />
            <ul className="lista-sidebar">
                {SidebarData.map((item) => {
                    return (
                        <li key={item.id} className='escolha-menu'>
                            <Link to={item.path}>
                                {item.icon}
                                <div>
                                    <span className="nome-menu">{item.title}</span>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default Sidebar;
