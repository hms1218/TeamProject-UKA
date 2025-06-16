import { Link } from 'react-router-dom';
import MainLogo from '../../assets/MainLogo.png';
import { SidoApiData } from '../../api/AnimalCommonApiData';
import { useState } from 'react';

import './MainHeader.css';

const MainHeaders = () => {

    const [boardDropdown, setBoardDropdown] = useState(false);
    const [supportDropdown, setSupportDropdown] = useState(false);

    // 버튼 클릭시 실행되는 함수
    const handleSaveData = async () => {
        // 저장 전 사용자 확인
        const confirmSave = window.confirm('정말 데이터를 저장하시겠습니까?');
        if (!confirmSave) return;

        try {
            await SidoApiData();
            alert('데이터 저장 완료!');
        } catch (error) {
            alert('저장 실패!');
        }
    };

    return (
        <header className="main-header">
            <div className="left-section" style={{cursor : "pointer"}}>
                <Link to="/">
                    <img src={MainLogo} alt="Logo" className="logo" />
                </Link>
            </div>

            <div className="right-section">
                <Link to="/" className="login-button">로그인</Link>
                {/* 데이터 저장 임시버튼 */}
                <button className="save-btn" onClick={handleSaveData} style={{ marginLeft: '10px' }}>
                    데이터저장
                </button>

                <nav className="nav-links">
                    <Link to="/about">입양하고싶어요</Link>

                    <div className="dropdown"
                         onMouseEnter={() => setBoardDropdown(true)}
                         onMouseLeave={() => setBoardDropdown(false)}
                    >
                        <span className="dropdown-title">
                            <Link to="/">게시판 </Link>
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
