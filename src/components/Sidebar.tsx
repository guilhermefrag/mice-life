import React from 'react';
import '../css/Sidebar.css';
import Rato from '../img/rato2.jpg';
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
            <ul className="">
                {SidebarData.map((item) => {
                    return (
                        <li key={item.id}>
                            <Link to={item.path}>
                                <span className=""></span>
                                <section>{item.title}</section>
                                {item.icon}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default Sidebar;
