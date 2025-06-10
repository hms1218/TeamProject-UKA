import React from 'react';
import { NavLink } from 'react-router-dom';
import './TabMenu.css'; // 선택: 스타일 분리

const TabMenu = () => {
  return (
    <nav className="tab-menu">
      <NavLink
        to="/customer/faq"
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        FAQ
      </NavLink>
      <NavLink
        to="/customer/qna"
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        QnA
      </NavLink>
      <NavLink
        to="/customer/adoption"
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        입양문의
      </NavLink>
    </nav>
  );
};

export default TabMenu;