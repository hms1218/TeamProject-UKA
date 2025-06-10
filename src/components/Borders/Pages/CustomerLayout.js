import { Outlet, NavLink, useLocation } from 'react-router-dom';
import './CustomerLayout.css';

const CustomerLayout = () => {
  const location = useLocation();

  return (
    <div className="customer-layout">
      {/* 헤더 */}
      <header className="customer-header">
        <h1 className="logo">고객센터</h1>
      </header>

      {/* 탭바 */}
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

      {/* 라우트 */}
      <main className="customer-content">
        <Outlet />
      </main>
    </div>
  );
};

export default CustomerLayout;