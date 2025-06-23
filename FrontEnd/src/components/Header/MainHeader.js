import { Link, useNavigate } from 'react-router-dom';
import MainLogo from '../../assets/MainLogo.png';
import { useState, useContext } from 'react';

import { AuthContext } from '../../AuthContext';

import './MainHeader.css';

const MainHeaders = () => {

    const [boardDropdown, setBoardDropdown] = useState(false);
    const [supportDropdown, setSupportDropdown] = useState(false);

    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleProfile = () => {
        alert("추후 개발 예정!");
        return;
    }

    return (
        <header className="main-header">
            <div className="left-section" style={{cursor : "pointer"}}>
                <Link to="/">
                    <img src={MainLogo} alt="Logo" className="logo" />
                </Link>
            </div>

            <div className="right-section">
                <div className="auth-buttons">
                    {user ? (
                        <>
                            {/* /profile */}
                            <Link to="/" onClick={handleProfile} className="profile-button">
                                마이페이지
                            </Link>
                            <button onClick={handleLogout} className="logout-button">
                                로그아웃
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/signup" className="signup-button">
                                회원가입
                            </Link>
                            <Link to="/login" className="login-button">
                                로그인
                            </Link>
                        </>
                    )}
                </div>
                
                <nav className="nav-links">
                    <Link to="/about">입양하고싶어요</Link>
                    <Link to="/request">찾고있어요</Link>
                    <Link to="/svg_map_detail" style={{marginRight : 10}}>테스트하고있어요</Link>

                    <div className="dropdown"
                         onMouseEnter={() => setBoardDropdown(true)}
                         onMouseLeave={() => setBoardDropdown(false)}
                    >
                        <span className="dropdown-title">
                            <Link to="/board">게시판</Link>
                            <span className="arrow">▼</span>
                        </span>
                        {boardDropdown && (
                            <div className="dropdown-menu">
                                <Link to="/board">전체</Link>
                                <Link to="/board/notice">공지사항</Link>
                                <Link to="/board/chat">속닥속닥</Link>
                                <Link to="/board/adoptionReview">입양후기</Link>
                                <Link to="/board/infoShare">새끼분양</Link>
                            </div>
                        )}
                    </div>

                    <div className="dropdown"
                         onMouseEnter={() => setSupportDropdown(true)}
                         onMouseLeave={() => setSupportDropdown(false)}
                    >
                        <span className="dropdown-title">
                            <Link to="/customer">고객센터</Link>
                            <span className="arrow">▼</span>
                        </span>
                        {supportDropdown && (
                            <div className="dropdown-menu">
                                <Link to="/customer">FAQ</Link>
                                <Link to="/customer/qna">Q&A</Link>
                                <Link to="/customer/adoption">입양문의</Link>
                                <Link to="/admin/reported">관리자 페이지</Link>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default MainHeaders;
