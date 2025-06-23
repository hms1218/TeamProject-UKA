import { Link, useNavigate } from 'react-router-dom';
import MainLogo from '../../assets/MainLogo.png';
import { useContext } from 'react';
import DropDownMenu from './DropDownMenu';
import { AuthContext } from '../../AuthContext';
import DogFootPrint from '../../assets/DogFootPrint.png';
import { useAdmin } from '../../api/AdminContext';

import './MainHeader.css';

const MainHeaders = () => {
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
            <div className="header-left-section">
                <Link to="/">
                    <img src={MainLogo} alt="Logo" className="logo" />
                </Link>
            </div>

            <div className="header-right-section">
                <div className="header-auth-buttons">
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
                
                <nav className="header-nav-links">
                    <Link to="/about" style={{marginRight : 25}}>입양하고싶어요</Link>
                    <Link to="/find" style={{marginRight : 10}}>찾고있어요</Link>
                    <Link to="/svg_map_detail" style={{marginRight : 10}}>테스트하고있어요</Link>
                    
                    <DropDownMenu
                        title="게시판"
                        to="/board"
                        items={[
                            { label: '전체', to: '/board/all' },
                            { label: '공지사항', to: '/board/notice' },
                            { label: '속닥속닥', to: '/board/chat' },
                            { label: '입양후기', to: '/board/adoptionReview' },
                        ]}
                    />
                    <DropDownMenu
                        title="고객센터"
                        to="/customer"
                        items={[
                            { label: 'FAQ', to: '/customer' },
                            { label: 'Q&A', to: '/customer/qna' },
                            { label: '입양문의', to: '/customer/adoption' },
                            ...(isAdmin ? [{ label: '관리자 페이지', to: '/admin/reported' }] : []),
                        ]}
                    />
                </nav>
            </div>
        </header>
    );
};

export default MainHeaders;
