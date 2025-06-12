import { useState } from "react";
import MainLogo from '../../assets/MainLogo.png';
import { Link } from 'react-router-dom';
import './MainHeader.css';

const MainHeaders = () => {
    const [boardDropdown, setBoardDropdown] = useState(false);
    const [supportDropdown, setSupportDropdown] = useState(false);

    return (
        <header className="main-header">
            <div className="left-section" style={{cursor : "pointer"}}>

                <Link to="/">
                    <img src={MainLogo} alt="Logo" className="logo" />
                </Link>

            </div>

            <div className="right-section">
                <Link to="/" className="login-button">로그인</Link>

                <nav className="nav-links">
                    <Link to="/about">입양하고싶어요(상세페이지)</Link>
                    <Link to="/">새로운동물소식</Link>

                    <div className="dropdown"
                         onMouseEnter={() => setBoardDropdown(true)}
                         onMouseLeave={() => setBoardDropdown(false)}
                    >
                        <span className="dropdown-title">
                            <Link to="/board">게시판 </Link>
                            <span className="arrow">▼</span>
                        </span>
                        {boardDropdown && (
                            <div className="dropdown-menu">
                                <Link to="/board/chat">속닥속닥</Link>
                                <Link to="/board/adoptionReview">입양후기</Link>
                                <Link to="/board/infoShare">정보공유</Link>
                                <Link to="/board/etc">잡다한것</Link>
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
                                <Link to="/">잡다한것</Link>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default MainHeaders;
