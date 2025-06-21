import { Link, useNavigate } from 'react-router-dom';
import MainLogo from '../../assets/MainLogo.png';
import { useState, useContext } from 'react';

import { AuthContext } from '../../AuthContext';

import './MainHeader.css';
import { useAdmin } from '../Board/Context/AdminContext';

const MainHeaders = () => {

    const [boardDropdown, setBoardDropdown] = useState(false);
    const [supportDropdown, setSupportDropdown] = useState(false);

    const { user, logout } = useContext(AuthContext);
    const { isAdmin, setIsAdmin } = useAdmin(); // 어드민 테스트중
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
                    {/* 가운데 발바닥 아이콘 */}
                    {/* <div className="middle-section">
                        <img src={DogFootPrint} alt="Dog Footprint" className="footprint-icon" />
                    </div> */}
                    {/* 관리자 토글 버튼 추가 */}
                <button
                    onClick={() => setIsAdmin(v => !v)}
                    style={{
                        background: isAdmin ? "#ffe066" : "#e9ecef",
                        border: "1px solid #adb5bd",
                        borderRadius: 8,
                        marginRight: 10,
                        padding: "4px 10px",
                        cursor: "pointer"
                    }}
                >
                    {isAdmin ? "관리자 모드" : "일반 모드"}
                </button>
                {/* 여기 위 까지 관리자 테스트 */}
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
                    <Link to="/about" style={{marginRight : 25}}>입양하고싶어요</Link>
                    <Link to="/find" style={{marginRight : 10}}>찾고있어요</Link>

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
                                <Link to="/board/all">전체게시판</Link>
                                <Link to="/board/notice">공지사항</Link>
                                <Link to="/board/chat">속닥속닥</Link>
                                <Link to="/board/adoptionReview">입양후기</Link>
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
