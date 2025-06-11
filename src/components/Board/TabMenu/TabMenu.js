import { NavLink } from 'react-router-dom';
import './TabMenu.css'; // 선택: 스타일 분리

const TabMenu = () => {
  return (
    <div className="tab-menu-wrapper">
      <nav className="tab-menu">
        <NavLink to="/board/chat" className={({ isActive }) => isActive ? 'active' : ''}>잡담</NavLink>
        <NavLink to="/board/adoptionReview" className={({ isActive }) => isActive ? 'active' : ''}>입양후기</NavLink>
        <NavLink to="/board/infoShare" className={({ isActive }) => isActive ? 'active' : ''}>정보공유</NavLink>
        <NavLink to="/board/etc" className={({ isActive }) => isActive ? 'active' : ''}>잡다한것</NavLink>
      </nav>
    </div>
  );
};

export default TabMenu;