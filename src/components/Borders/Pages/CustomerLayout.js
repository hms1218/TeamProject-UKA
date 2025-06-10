import { Outlet, NavLink, useLocation } from 'react-router-dom';
import './CustomerLayout.css';
import Chatbot from './Chatbot';
import { useState } from 'react';

const CustomerLayout = ({children}) => {
  const location = useLocation();
  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot((prev) => !prev);
  };

  return (
    <div className="customer-layout">
      {/* 헤더 */}
      <div className="customer-header-container">
        <div className="customer-header-left">
          <h1 className="customer-title">고객센터</h1>
        </div>
        <div className="customer-header-center">
          <input
            className="customer-search-input"
            type="text"
            placeholder="자주 묻는 질문 검색"
          />
          <button className="customer-search-button">
            🔍
          </button>
        </div>
        <div className="customer-header-right">
          <button
            className="customer-chat-button"
            onClick={toggleChatbot}
          >
            💬 채팅 상담하기
          </button>
        </div>
        {children}

        {/* 🔽 조건부로 챗봇 표시 */}
        {showChatbot && <Chatbot />}
      </div>

      {/* 탭 메뉴 */}
      <nav className="mini-tab-bar">
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

      {/* 라우트 출력 영역 */}
      <main className="customer-content">
        <Outlet />
      </main>
    </div>
  );
};

export default CustomerLayout;
