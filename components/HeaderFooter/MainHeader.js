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
                <img src={MainLogo} alt="Logo" className="logo" />
            </div>

            <div className="right-section">
                <Link to="/" className="login-button">로그인</Link>

                <nav className="nav-links">
                    <Link to="/">입양하고싶어요(상세페이지)</Link>
                    <Link to="/about">새로운동물소식</Link>

                    <div className="dropdown"
                         onMouseEnter={() => setBoardDropdown(true)}
                         onMouseLeave={() => setBoardDropdown(false)}
                    >
                        <span className="dropdown-title">게시판 
                            <span className="arrow">▼</span>
                        </span>
                        {boardDropdown && (
                            <div className="dropdown-menu">
                                <Link to="/=">FAQ</Link>
                                <Link to="/">Q&A</Link>
                                <Link to="/">입양문의</Link>
                                <Link to="/">잡다한것</Link>
                            </div>
                        )}
                    </div>

                    <div className="dropdown"
                         onMouseEnter={() => setSupportDropdown(true)}
                         onMouseLeave={() => setSupportDropdown(false)}
                    >
                        <span className="dropdown-title">고객센터
                            <span className="arrow">▼</span>
                        </span>
                        {supportDropdown && (
                            <div className="dropdown-menu">
                                <Link to="/">잡담</Link>
                                <Link to="/">입양후기</Link>
                                <Link to="/">정보공유</Link>
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
