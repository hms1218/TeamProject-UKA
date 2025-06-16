import { NavLink } from 'react-router-dom';
import './TabMenu.css'; // 선택: 스타일 분리

const TabMenu = () => {
    return (
        <div className="tab-menu-wrapper">
            <nav className="tab-menu">
                <NavLink to="/board" className={({ isActive }) => isActive ? 'active' : ''}>전체</NavLink>
                <NavLink to="/board/notice" className={({ isActive }) => isActive ? 'active' : ''}>공지사항</NavLink>
                <NavLink to="/board/chat" className={({ isActive }) => isActive ? 'active' : ''}>속닥속닥</NavLink>
                <NavLink to="/board/adoptionReview" className={({ isActive }) => isActive ? 'active' : ''}>입양후기</NavLink>
                <NavLink to="/board/infoShare" className={({ isActive }) => isActive ? 'active' : ''}>새끼분양</NavLink>
            </nav>
        </div>
    );
};

export default TabMenu;