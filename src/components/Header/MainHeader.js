import { Link } from 'react-router-dom';
import MainLogo from '../../assets/MainLogo.png';
import DropDownMenu from './DropDownMenu';
import './MainHeader.css';
import { fetchAndSendAnimals } from '../../api/AnimalApiData';
import { SidoApiData } from '../../api/AnimalCommonApiData';



const MainHeaders = () => {

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
                    <Link to="/">입양하고싶어요</Link>

                    {/* DropDownMenu 컴포넌트 사용 */}
                    <DropDownMenu title="게시판"
                                  to="/board"
                                  items={[
                                      { label: "잡담", to: "/board/chat" },
                                      { label: "입양후기", to: "/board/review" },
                                      { label: "정보공유", to: "/board/info" },
                                      { label: "잡다한것", to: "/board/etc" },
                                  ]}
                    />
                    <DropDownMenu title="고객센터"
                                  to="/customer"
                                  items={[
                                      { label: "FAQ", to: "/customer/faq" },
                                      { label: "Q&A", to: "/customer/qna" },
                                      { label: "입양문의", to: "/customer/adoption" },
                                      { label: "잡다한것", to: "/customer/etc" },
                                  ]}
                    />
                </nav>
            </div>
        </header>
    );
};

export default MainHeaders;
